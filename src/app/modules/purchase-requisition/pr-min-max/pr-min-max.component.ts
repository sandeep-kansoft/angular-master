import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/shared/services/common.service';
import { PrGridDataDto } from '../pr-grid-view';
import { PrHistoryDetailComponent } from '../pr-history-detail/pr-history-detail.component';
import { PrModalViewComponent } from '../pr-modal-view/pr-modal-view.component';
import { PrGridData } from '../pr-overview/data';
import { PurchaseRequistionServiceService } from '../purchase-requistion-service.service';
import { Po_or_RFQOrder } from './data';

@Component({
  selector: 'app-pr-min-max',
  templateUrl: './pr-min-max.component.html',
  styleUrls: ['./pr-min-max.component.scss'],
})
export class PrMinMaxComponent {
  public gridView: GridDataResult;
  dropdownListdata = ['Preview', 'RFQ', 'Auction', 'Lines', 'History'];
  columnWidth = 150;
  pageSize = 100;
  headerStyle = 'fw-bold';
  loading: boolean = false;
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
  prData: any[] = Po_or_RFQOrder;


  constructor(
    private commonService: CommonService,
    private prDetailModel: NgbModal,
    private prLineViewModel: NgbModal,
    private prHistoryModel: NgbModal,
    private prservice: PurchaseRequistionServiceService,
    private cdr: ChangeDetectorRef,
  ) {this.allData = this.allData.bind(this);}

  public ngOnInit() {
    this.loadProducts();
    this.getMinMax();
  }

  private loadProducts(): void {
    this.gridView = process(this.minmaxdata, this.state);
  }

  checkMobileBrowser() {
    console.log(
      'this.commonService.isMobileBrowser',
      this.commonService.isMobileBrowser
    );
    return this.commonService.isMobileBrowser;
  }

  editHandler(item: PrGridDataDto) {}

  removeHandler(item: PrGridDataDto) {}

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

  onModelClick(type: string, item: any) {
    console.log('item', item);
    switch (type) {
      case 'Preview':
        break;
      case 'RFQ':
        break;
      case 'Auction':
        break;
      case 'Lines':
        this.openLinesModel();
        break;
      case 'History':
        this.openHistoryModel();
        break;

      default:
        break;
    }
  }

  // openPrDetailModel() {
  //   this.prDetailModel.open(PrDetailViewComponent, {
  //     centered: true,
  //     fullscreen: true,
  //     scrollable: true,
  //   });
  // }

  openLinesModel() {
    this.prLineViewModel.open(PrModalViewComponent, {
      centered: true,
      fullscreen: true,
      scrollable: true,
    });
  }

  openHistoryModel() {
    this.prHistoryModel.open(PrHistoryDetailComponent, {
      centered: true,
      fullscreen: true,
      scrollable: true,
    });
  }
  showdata(data: any) {
    console.log('data', data);
  }
  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: process(this.prData, { sort: this.state.sort }).data,
    };

    return result;
  }
  minmaxdata:any=[];
  getMinMax(){
    this.loading = true;
    this.prservice.getAllPpo().subscribe({
      next: (result: any) => {
        this.minmaxdata = result;
        console.log('minmaxdata', this.minmaxdata);
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

