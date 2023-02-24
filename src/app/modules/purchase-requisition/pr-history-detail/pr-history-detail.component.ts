import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, process, State } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/shared/common.service';
import { historyData } from './historydata';

@Component({
  selector: 'app-pr-history-detail',
  templateUrl: './pr-history-detail.component.html',
  styleUrls: ['./pr-history-detail.component.scss'],
})
export class PrHistoryDetailComponent {
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
  historyDataLocal: any = historyData;
  dropdownListdata = ['RFQT', 'AUCTION', 'VIEW', 'VIEW HISTORICAL DATA'];
  columnWidth = 150;
  pageSize = 10;

  constructor(
    private commonService: CommonService,
    public modal: NgbModal,
    private prDetailModel: NgbModal
  ) {}

  public ngOnInit() {
    this.loadProducts();
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
}
