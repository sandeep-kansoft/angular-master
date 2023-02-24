import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRequestRoutingModule } from './purchase-requisition-routing.module';
import { PrModalViewComponent } from './pr-modal-view/pr-modal-view.component';
import { PrGridViewComponent } from './pr-grid-view/pr-grid-view.component';
import { PrDetailViewComponent } from './pr-detail-view/pr-detail-view.component';
import { PrOverviewComponent } from './pr-overview/pr-overview.component';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [
    PrOverviewComponent,
    PrModalViewComponent,
    PrGridViewComponent,
    PrDetailViewComponent
  ],
  imports: [
    CommonModule,
    PurchaseRequestRoutingModule,
    GridModule
  ]
})
export class PurchaseRequestModule { }
