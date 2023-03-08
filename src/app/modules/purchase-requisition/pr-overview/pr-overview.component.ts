import { ChangeDetectorRef, Component } from '@angular/core';
import { ExcelExportEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { PrGridData } from './data';
import { process, State } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/shared/services/common.service';
import { PrGridDataDto } from '../pr-grid-view';
import { SortDescriptor } from '@progress/kendo-data-query';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrDetailViewComponent } from '../pr-detail-view/pr-detail-view.component';
import { PrModalViewComponent } from '../pr-modal-view/pr-modal-view.component';
import { PrHistoryDetailComponent } from '../pr-history-detail/pr-history-detail.component';
import {
  ExcelExportData,
  Workbook,
} from '@progress/kendo-angular-excel-export';
import { saveAs } from '@progress/kendo-file-saver';
import { Observable, zip } from 'rxjs';
import { PurchaseRequistionServiceService } from '../purchase-requistion-service.service';
import { PrHistoryResponseDto, PrResponseDto } from '../purchase-requisition';
@Component({
  selector: 'app-pr-overview',
  templateUrl: './pr-overview.component.html',
  styleUrls: ['./pr-overview.component.scss'],
})
export class PrOverviewComponent {
  public gridView: GridDataResult;
  dropdownListdata = ['Preview', 'RFQ', 'Auction', 'Lines', 'History'];
  columnWidth = 150;
  headerStyle = 'fw-bold';
  smallColumnWidth = 120;
  longColumnWidth = 200;
  pageSize = 10;
  pageNumber = 0
  loading: boolean = false;

  serachText: string = '';
  public state: State = {
    // // sort: [
    // //   {
    // //     field: 'sno',
    // //     dir: 'asc',
    // //   },
    // // ],
    // filter: {
    //   logic: 'and',
    //   filters: [],
    // },
    // skip: 0,
    // take: this.pageSize,
  };
  // prData: PrGridDataDto[] = PrGridData;

  constructor(
    private commonService: CommonService,
    private prDetailModel: NgbModal,
    private prLineViewModel: NgbModal,
    private prHistoryModel: NgbModal,
    private prservice: PurchaseRequistionServiceService,
    private cdr: ChangeDetectorRef
  ) {
    this.allData = this.allData.bind(this);
  }

  public ngOnInit() {
    // this.loadProducts();
    this.getMyPrList();
  }

  private loadProducts(): void {
    this.gridView = process(this.overviewdata, this.state);
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

  onModelClick(type: string, item: PrResponseDto, isPrNumberClick = false) {
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
  showdata(data: any) {
    console.log('data', data);
  }

  showBadgeStatusColorClass(type: string): string {
    let color: string = '';
    switch (type) {
      case 'Approved':
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

  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: process(this.overviewdata, { sort: this.state.sort }).data,
    };

    return result;
  }
  overviewdata: PrResponseDto[] = [];

  getMyPrList() {


    this.loading = true;
    this.prservice.getMyPrList(this.pageSize, this.pageNumber).subscribe({
      next: (result: any) => {
        this.overviewdata = result;
        console.log('overview', this.overviewdata);
        // this.loadProducts()
        this.loading = false;
        this.gridView = process(result?.data, this.state);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err)
        this.loading = false;
      },
    });
  }
}
