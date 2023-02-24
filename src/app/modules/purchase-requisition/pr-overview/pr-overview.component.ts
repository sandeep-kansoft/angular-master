import { Component } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { PrGridData } from './data';
import { process, State } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/shared/common.service';
import { PrGridDataDto } from '../pr-grid-view';
import { SortDescriptor } from '@progress/kendo-data-query';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrDetailViewComponent } from '../pr-detail-view/pr-detail-view.component';
import { PrModalViewComponent } from '../pr-modal-view/pr-modal-view.component';
import { PrHistoryDetailComponent } from '../pr-history-detail/pr-history-detail.component';

@Component({
  selector: 'app-pr-overview',
  templateUrl: './pr-overview.component.html',
  styleUrls: ['./pr-overview.component.scss'],
})
export class PrOverviewComponent {
  public gridView: GridDataResult;
  dropdownListdata = ['Preview', 'RFQ', 'Auction', 'Lines', 'History'];
  columnWidth = 150;
  pageSize = 100;

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
  prData: PrGridDataDto[] = PrGridData;

  constructor(
    private commonService: CommonService,
    private prDetailModel: NgbModal,
    private prLineViewModel: NgbModal,
    private prHistoryModel: NgbModal
  ) {}

  public ngOnInit() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.gridView = process(this.prData, this.state);
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
}
