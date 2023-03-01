import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRequestRoutingModule } from './purchase-requisition-routing.module';
import { PrModalViewComponent } from './pr-modal-view/pr-modal-view.component';
import { PrGridViewComponent } from './pr-grid-view/pr-grid-view.component';
import { PrDetailViewComponent } from './pr-detail-view/pr-detail-view.component';
import { PrOverviewComponent } from './pr-overview/pr-overview.component';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrHistoryDetailComponent } from './pr-history-detail/pr-history-detail.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { PrMinMaxComponent } from './pr-min-max/pr-min-max.component';
import { PrAllViewComponent } from './pr-all-view/pr-all-view.component';
import { DemoPageComponent } from './demo-page/demo-page.component';
@NgModule({
  declarations: [
    PrOverviewComponent,
    PrModalViewComponent,
    PrGridViewComponent,
    PrDetailViewComponent,
    PrHistoryDetailComponent,
    PrMinMaxComponent,
    PrAllViewComponent,
    DemoPageComponent,
  ],
  imports: [
    CommonModule,
    PurchaseRequestRoutingModule,
    GridModule,
    NgbModule,
    InlineSVGModule,
    ExcelModule,
  ],
})
export class PurchaseRequestModule {}
