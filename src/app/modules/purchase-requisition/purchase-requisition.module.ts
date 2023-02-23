import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRequestRoutingModule } from './purchase-requisition-routing.module';
import { PurchaseRequestComponent } from './purchase-requisition.component';
import { PrModalViewComponent } from './pr-modal-view/pr-modal-view.component';
import { PrGridViewComponent } from './pr-grid-view/pr-grid-view.component';
import { PrDetailViewComponent } from './pr-detail-view/pr-detail-view.component';

@NgModule({
  declarations: [
    PurchaseRequestComponent,
    PrModalViewComponent,
    PrGridViewComponent,
    PrDetailViewComponent
  ],
  imports: [
    CommonModule,
    PurchaseRequestRoutingModule
  ]
})
export class PurchaseRequestModule { }
