import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, process, State } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/shared/common.service';
import { PrDetailViewComponent } from '../pr-detail-view/pr-detail-view.component';
import { PrGridDataDto } from '../pr-grid-view';
import { PrLinesData } from './data';

@Component({
  selector: 'app-pr-modal-view',
  templateUrl: './pr-modal-view.component.html',
  styleUrls: ['./pr-modal-view.component.scss'],
})
export class PrModalViewComponent {
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
  prData: PrGridDataDto[] = PrLinesData;
  dropdownListdata = ['RFQT', 'AUCTION', 'VIEW', 'VIEW HISTORICAL DATA'];
  columnWidth = 150;
  pageSize = 10;
  isFormVisible: boolean = false;

  constructor(
    private commonService: CommonService,
    public modal: NgbModal,
    private prDetailModel: NgbModal
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

  closeModel() {
    if (this.isFormVisible) {
      this.isFormVisible = false;
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
}
