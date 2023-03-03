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
  pageSize = 100;
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

  onModelClick(type: string, item: PrResponseDto) {
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
        this.openHistoryModel(item.prid);
        break;

      default:
        break;
    }
  }

  onPrNumberClick(item: PrResponseDto) {
    this.openLinesModel(item.prid);
  }

  // openPrDetailModel() {
  //   this.prDetailModel.open(PrDetailViewComponent, {
  //     centered: true,
  //     fullscreen: true,
  //     scrollable: true,
  //   });
  // }

  openLinesModel(id?: number) {
    const modelRef = this.prLineViewModel.open(PrModalViewComponent, {
      centered: true,
      fullscreen: true,
      scrollable: true,
    });

    modelRef.componentInstance.prId = id;
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
  // public onExcelExport(args: ExcelExportEvent): void {
  //   // Prevent automatically saving the file. We will save it manually after we fetch and add the details
  //   args.preventDefault();

  //   // this.loading = true;

  //   const observables = [];
  //   const workbook = args.workbook;
  //   const rows = workbook.sheets[0].rows;

  //   // Get the default header styles.
  //   // Aternatively set custom styles for the details
  //   // https://www.telerik.com/kendo-angular-ui/components/excelexport/api/WorkbookSheetRowCell/
  //   const headerOptions = rows[0].cells[0];

  //   const data = this.gridView.data;

  //   // Fetch the data for all details
  //   for (let idx = 0; idx < data.length; idx++) {
  //     observables.push(this.productService.fetchForCategory(data[idx]));
  //   }

  //   zip.apply(Observable, observables).subscribe((result: GridDataResult[]) => {
  //     // add the detail data to the generated master sheet rows
  //     // loop backwards in order to avoid changing the rows index
  //     for (let idx = result.length - 1; idx >= 0; idx--) {
  //       const products = (<GridDataResult>result[idx]).data;

  //       // add the detail data
  //       for (
  //         let productIdx = products.length - 1;
  //         productIdx >= 0;
  //         productIdx--
  //       ) {
  //         const product = products[productIdx];
  //         rows.splice(idx + 2, 0, {
  //           cells: [
  //             {},
  //             { value: product.ProductID },
  //             { value: product.ProductName },
  //           ],
  //         });
  //       }

  //       // add the detail header
  //       rows.splice(idx + 2, 0, {
  //         cells: [
  //           {},
  //           Object.assign({}, headerOptions, { value: 'Product ID' }),
  //           Object.assign({}, headerOptions, { value: 'Product Name' }),
  //         ],
  //       });
  //     }

  //     // create a Workbook and save the generated data URL
  //     // https://www.telerik.com/kendo-angular-ui/components/excelexport/api/Workbook/
  //     new Workbook(workbook).toDataURL().then((dataUrl: string) => {
  //       // https://www.telerik.com/kendo-angular-ui/components/filesaver/
  //       saveAs(dataUrl, 'Categories.xlsx');
  //     });
  //   });
  // }

  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: process(this.overviewdata, { sort: this.state.sort }).data,
    };

    return result;
  }
  overviewdata: PrResponseDto[] = [];

  getMyPrList() {
    this.loading = true;
    this.prservice.getMyPrList(10, 1).subscribe({
      next: (result: any) => {
        this.overviewdata = result;
        console.log('overview', this.overviewdata);
        // this.loadProducts()
        this.loading = false;
        this.gridView = process(result?.data, this.state);
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
