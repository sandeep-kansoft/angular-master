import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, process, State } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/shared/services/common.service';
import { PrDetailViewComponent } from '../pr-detail-view/pr-detail-view.component';
import { PrGridDataDto } from '../pr-grid-view';
import {
  PrLineHeaderDetail,
  PrLineHistoryResponseDto,
  PrLineResponseDto,

  PrLinesDetailResponseDto,
} from '../purchase-requisition';
import { PurchaseRequistionServiceService } from '../purchase-requistion-service.service';
import { PohistoryData, PrLinesData } from './data';

@Component({
  selector: 'app-pr-modal-view',
  templateUrl: './pr-modal-view.component.html',
  styleUrls: ['./pr-modal-view.component.scss'],
})
export class PrModalViewComponent {
  headerStyle = 'fw-bold';
  public gridView: GridDataResult;
  public PoHistorydataGridView: GridDataResult;
  @Input() prId: number;
  @Input() isPrNumberClick: boolean;
  public state: State = {
    // sort: [
    //   {
    //     field: 'prid',
    //     dir: 'asc',
    //   },
    // ],
    // filter: {
    //   logic: 'and',
    //   filters: [],
    // },
    skip: 0,
    take: 10,
  };
  prLineData: PrLineResponseDto[];
  prLineHistoryData: PrLineHistoryResponseDto[];
  currentSelectedHistoryData = {
    itemCode: "",
    itemDescription: ""
  };
  currentPage = 'Lines';
  dropdownListdata = ['RFQT', 'AUCTION', 'VIEW', 'VIEW HISTORICAL DATA'];
  columnWidth = 150;
  pageSize = 10;
  isFormVisible: boolean = false;
  viewPoHistoryData = [];
  historyDataLoading = false;
  prLinesDetailLoading = false;
  linesDataLoading = false;
  PrheaderDetail: PrLineHeaderDetail
  PrLinesDetail: PrLinesDetailResponseDto

  public PoHistorydata: State = {
    sort: [
      {
        field: 'Vendor_Code',
        dir: 'asc',
      },
    ],
    filter: {
      logic: 'and',
      filters: [],
    },
    skip: 0,
    take: 10,
  };

  public isHistoricalDataVisible: boolean = false;

  constructor(
    private commonService: CommonService,
    public modal: NgbModal,
    private prDetailModel: NgbModal,
    private prService: PurchaseRequistionServiceService
  ) { }

  public ngOnInit() {
    this.currentPage = this.isPrNumberClick ? 'Both' : 'Lines'
    this.getPrLines();
    this.getPrHeaderDetailByid();

    // this.loadHistorydataTable();
  }

  private loadPrLineTable(): void {
    this.gridView = process(this.prLineData, this.state);
  }

  private loadHistorydataTable(): void {
    this.PoHistorydataGridView = process(
      this.prLineHistoryData,
      this.PoHistorydata
    );
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
    this.loadPrLineTable();
  }

  closeModel() {
    switch (this.currentPage) {
      case 'Form':
        this.currentPage = 'Lines';
        break;
      case 'HistoryData':
        this.currentPage = 'Lines';
        break;
      case 'Lines':
        this.modal.dismissAll();
        break;
      case 'Both':
        this.modal.dismissAll();
        break;

      default:
        break;
    }

    // if (this.isFormVisible) {
    //   this.isFormVisible = false;
    // } else if (this.isHistoricalDataVisible) {
    //   this.isHistoricalDataVisible = false;
    // } else {
    //   this.modal.dismissAll();
    // }
  }

  dropDownMenuClickHandler(type: string, data: PrLineResponseDto) {
    switch (type) {
      case 'RFQT':
        break;
      case 'AUCTION':
        break;
      case 'VIEW':
        //this.showHistoryModel();
        this.currentPage = 'Form';
        this.getPrLineDetailByid(data.prtransid);
        break;
      case 'VIEW HISTORICAL DATA':
        this.getPrLinesHistory(data.itemcode);
        this.currentSelectedHistoryData.itemCode = data.itemcode;
        this.currentSelectedHistoryData.itemDescription = data.iteM_DESCRIPTION;
        this.currentPage = 'HistoryData';
        break;

      default:
        break;
    }
  }

  showHistoryModel() {
    this.prDetailModel.open(PrDetailViewComponent, {
      centered: true,
      fullscreen: true,
      scrollable: true,
    });
  }

  showBadgeStatusColorClass(param: string): string {
    let type = param.toLowerCase();
    let color: string = '';
    switch (type) {
      case 'pending':
        color = 'badge-danger';
        break;

      default:
        break;
    }
    return color;
  }

  getPrLines() {
    this.linesDataLoading = true;
    this.prService.getLineItem(this.prId).subscribe({
      next: (result: any) => {
        this.prLineData = result.data;
        console.log('pr line data', result.data);
        this.loadPrLineTable();
        this.linesDataLoading = false
      },
      error: (err) => {
        this.linesDataLoading = false
      },
    });
  }

  getPrLinesHistory(itemCode: string) {
    this.historyDataLoading = true;
    this.prService.getPrLineHistory(itemCode).subscribe({
      next: (result: any) => {
        console.log("here pr history data is", result);
        this.prLineHistoryData = result.data;
        this.loadHistorydataTable();
        this.historyDataLoading = false;
      },
      error: (err) => {
        this.historyDataLoading = false
      },
    });
  }

  getPrHeader(itemCode: string) {
    this.historyDataLoading = true;
    this.prService.getPrLineHistory(itemCode).subscribe({
      next: (result: any) => {
        this.prLineHistoryData = result.data;
        this.loadHistorydataTable();
        this.historyDataLoading = false;
      },
      error: (err) => {
        this.historyDataLoading = false
      },
    });
  }



  getPrHeaderDetailByid() {

    this.prService.getPrHeaderDetailBYid(this.prId).subscribe({
      next: (result: any) => {
        console.log("result header", result)
        this.PrheaderDetail = result.data
      },
      error: (err) => {
        this.historyDataLoading = false
      },
    });
  }

  getPrLineDetailByid(prtransid: number) {

    this.prLinesDetailLoading = true;
    this.prService.getPrLineDetailBYid(prtransid).subscribe({
      next: (result: any) => {
        console.log("result line deatil", result)
        this.PrLinesDetail = result.data
      },
      error: (err) => {
        this.prLinesDetailLoading = false
      },
    });
  }


}
