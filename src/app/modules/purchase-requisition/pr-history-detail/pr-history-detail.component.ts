import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, process, State } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/shared/common.service';
import { PrHistoryResponseDto } from '../purchase-requisition';
import { PurchaseRequistionServiceService } from '../purchase-requistion-service.service';
import { historyData } from './historydata';

@Component({
  selector: 'app-pr-history-detail',
  templateUrl: './pr-history-detail.component.html',
  styleUrls: ['./pr-history-detail.component.scss'],
})
export class PrHistoryDetailComponent {
  headerStyle = 'fw-bold';
  @Input() prId: number;
  public gridView: GridDataResult;
  public state: State = {
    sort: [
      {
        field: 'prid',
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
  historyDataLocal!: PrHistoryResponseDto[];
  dropdownListdata = ['RFQT', 'AUCTION', 'VIEW', 'VIEW HISTORICAL DATA'];
  columnWidth = 150;
  pageSize = 10;
  isLoading = false
  constructor(
    private commonService: CommonService,
    public modal: NgbModal,
    private prDetailModel: NgbModal,
    private prService: PurchaseRequistionServiceService
  ) {}

  public ngOnInit() {
    this.getPrHistory();
  }

  private loadProducts(): void {
    this.gridView = process(this.historyDataLocal, this.state);
  }

  checkMobileBrowser() {
    console.log(
      'this.commonService.isMobileBrowser',
      this.commonService.isMobileBrowser
    );
    return this.commonService.isMobileBrowser;
  }

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
    this.modal.dismissAll();
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

  getPrHistory() {
    this.isLoading = true
    this.prService.getPrHistory(this.prId).subscribe({
      next: (result: any) => {
        this.historyDataLocal = result.data;
        console.log("Data is ", result.data)
        this.loadProducts();
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false
      },
    });
  }
}
