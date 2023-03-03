import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, process, State } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/shared/common.service';
import { PrDetailViewComponent } from '../pr-detail-view/pr-detail-view.component';
import { PrGridDataDto } from '../pr-grid-view';
import { PrLineResponseDto } from '../purchase-requisition';
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
  dropdownListdata = ['RFQT', 'AUCTION', 'VIEW', 'VIEW HISTORICAL DATA'];
  columnWidth = 150;
  pageSize = 10;
  isFormVisible: boolean = false;
  viewPoHistoryData = [];

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
  ) {}

  public ngOnInit() {
    this.getPrLines();
    // this.loadPoHistorydataProducts();
  }

  private loadProducts(): void {
    this.gridView = process(this.prLineData, this.state);
  }

  private loadPoHistorydataProducts(): void {
    this.PoHistorydataGridView = process(PohistoryData, this.PoHistorydata);
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

  closeModel() {
    if (this.isFormVisible) {
      this.isFormVisible = false;
    } else if (this.isHistoricalDataVisible) {
      this.isHistoricalDataVisible = false;
    } else {
      this.modal.dismissAll();
    }
  }

  dropDownMenuClickHandler(type: string, data: any) {
    switch (type) {
      case 'RFQT':
        break;
      case 'AUCTION':
        break;
      case 'VIEW':
        this.isFormVisible = true;
        //this.showHistoryModel();
        break;
      case 'VIEW HISTORICAL DATA':
        this.isHistoricalDataVisible = true;
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
    this.prService.getLineItem(this.prId).subscribe({
      next: (result: any) => {
        this.prLineData = result.data;
        console.log('pr line data', result.data);
        this.loadProducts();
      },
      error: (err) => {},
    });
  }

  getPrLinesHistory() {
    this.prService.getPrHistory(this.prId).subscribe({
      next: (result: any) => {
        this.prLineData = result.data;
        console.log('pr line data', result.data);
        this.loadProducts();
      },
      error: (err) => {},
    });
  }
}
