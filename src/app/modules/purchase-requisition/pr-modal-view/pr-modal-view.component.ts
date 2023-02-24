import { Component } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, process,  State } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/shared/common.service';
import { PrGridDataDto } from '../pr-grid-view';
import { PrLinesData } from './data';

@Component({
  selector: 'app-pr-modal-view',
  templateUrl: './pr-modal-view.component.html',
  styleUrls: ['./pr-modal-view.component.scss']
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

  columnWidth = 150;
  pageSize = 10;

  constructor(private commonService: CommonService) {}

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
}
