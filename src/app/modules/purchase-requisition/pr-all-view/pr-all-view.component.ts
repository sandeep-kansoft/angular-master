import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/shared/services/common.service';
import { PrGridDataDto } from '../pr-grid-view';
import { PrHistoryDetailComponent } from '../pr-history-detail/pr-history-detail.component';
import { PrModalViewComponent } from '../pr-modal-view/pr-modal-view.component';
import { PurchaseRequistionServiceService } from '../purchase-requistion-service.service';
import { LineData, PrGridData } from './data';
import { PrAllViewData } from './data';

@Component({
  selector: 'app-pr-all-view',
  templateUrl: './pr-all-view.component.html',
  styleUrls: ['./pr-all-view.component.scss'],
})
export class PrAllViewComponent {
  replytype: any = 1;
  headerStyle = 'fw-bold';
  public lineviewdata: GridDataResult;
  public gridView: GridDataResult;
  dropdownListdata = ['Preview', 'Lines', 'History'];
  columnWidth = 150;
  pageSize = 10;
  pageNumber = 1;
  isLoading: boolean = false;
  serachText: string = '';
  public state: State = {
    sort: [
      {
        field: 'sno',
        dir: 'asc',
      },
    ],
    filter: {
      logic: 'and',
      filters: [],
    },
    skip: 0,
    take: this.pageSize,
  };
  prData: PrGridDataDto[] = PrAllViewData;
  linedata: PrGridDataDto[] = LineData;
  startDate: string = ''
  endDate: string = ''
  searchText: string = ''

  constructor(
    private commonService: CommonService,
    private prDetailModel: NgbModal,
    private prLineViewModel: NgbModal,
    private prHistoryModel: NgbModal,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private prservice: PurchaseRequistionServiceService
  ) {
    this.allData = this.allData.bind(this);
  }

  public ngOnInit() {
    this.getALLMyPrList();
    this.loadProducts();
    this.lineviewdataload();
  }

  private loadProducts(): void {
    this.gridView = process(this.prData, this.state);
  }
  private lineviewdataload(): void {
    this.lineviewdata = process(this.linedata, this.state);
  }

  backbutton() {
    this.replytype = 1;
  }
  checkMobileBrowser() {
    console.log(
      'this.commonService.isMobileBrowser',
      this.commonService.isMobileBrowser
    );
    return this.commonService.isMobileBrowser;
  }

  editHandler(item: PrGridDataDto) { }

  removeHandler(item: PrGridDataDto) { }

  public onStateChange(state: any) {
    this.state = state;

    const newState: any = Object.assign({}, state);

    const sortDescriptor = state.sort.find((s: any) => s.field === 'prid');
    const newSortDescriptor: SortDescriptor = { field: '', dir: 'asc' };
    if (sortDescriptor && sortDescriptor.field === 'prid') {
      newSortDescriptor.field = 'Unit Price';
      newSortDescriptor.dir = sortDescriptor.dir;
    }
    newState.sort = newState.sort.filter(
      (s: any) => s.field !== 'ProdupridctName'
    );
    newState.sort.push(newSortDescriptor);
    this.loadProducts();
  }

  dropDownMenuClickHandler(type: string, item: any) {
    switch (type) {
      case 'Preview':
        break;
      case 'RFQ':
        break;
      case 'Auction':
        break;
      case 'Lines':
        this.differentdiv();
        break;
      case 'History':
        // this.openHistoryModel();
        break;

      default:
        break;
    }
  }
  prnoclicked() {
    this.router.navigate(['./pr-detail-view.module']);
  }
  onModelClick(type: string, item: any, isPrNumberClick = false) {
    console.log('item', item);
    switch (type) {
      case 'Preview':
        break;
      case 'RFQ':
        break;
      case 'Auction':
        break;
      case 'Lines':
        this.openLinesModel(item.prid, isPrNumberClick);
        break;
      case 'History':
        this.openHistoryModel(item.prid);
        break;

      default:
        break;
    }
  }


  showBadgeStatusColorClass(type: string): string {
    let color: string = '';
    switch (type) {
      case 'In Process':
        color = 'badge-success';
        break;
      case 'Pending':
        color = 'badge-warning';
        break;
      case 'Closed':
        color = 'badge-danger';
        break;

      default:
        break;
    }
    return color;
  }
  // openPrDetailModel() {
  //   this.prDetailModel.open(PrDetailViewComponent, {
  //     centered: true,
  //     fullscreen: true,
  //     scrollable: true,
  //   });
  // }

  showdata(data: any) {
    console.log('data', data);
  }
  differentdiv() {
    this.replytype = 2;
  }
  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: process(this.prData, { sort: this.state.sort }).data,
    };

    return result;
  }
  allprdata: any[]
  getALLMyPrList() {
    this.isLoading = true;
    let payload = {
      isAllPR: 1,
      startDate: this.startDate,
      endDate: this.endDate,
      prNo: this.searchText,
      pageSize: this.pageSize,
      pageIndex: this.pageNumber,
    };
    console.log("Playload is ", payload)
    this.prservice.getALLPrList(payload).subscribe({
      next: (result: any) => {
        this.allprdata = result;
        console.log('allprdata', result);
        this.loadProducts()
        this.isLoading = false;
        this.gridView = process(result?.data, this.state);
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false
        // this.loading = false;
      },
    });
  }

  openLinesModel(id?: number, isPrNumberClick: boolean = false) {
    const modelRef = this.prLineViewModel.open(PrModalViewComponent, {
      centered: true,
      fullscreen: true,
      scrollable: true,
    });

    modelRef.componentInstance.prId = id;
    modelRef.componentInstance.isPrNumberClick = isPrNumberClick;
  }

  openHistoryModel(id: number) {
    const modelRef = this.prHistoryModel.open(PrHistoryDetailComponent, {
      centered: true,
      fullscreen: true,
      scrollable: true,
    });
    modelRef.componentInstance.prId = id;
  }

  searchButtonClick() {
    if (!this.isLoading) {
      this.getALLMyPrList();
    }
  }
  dateChangeEvent(event: any, type: string) {
    switch (type) {
      case 'startDate':
        this.startDate = event;
        break;
      case 'endDate':
        this.endDate = event;

        break;

      default:
        break;
    }
    console.log("event date is ", { start: this.startDate, end: this.endDate })
  }
}
