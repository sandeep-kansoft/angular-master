import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoPageComponent } from './demo-page/demo-page.component';
import { PrAllViewComponent } from './pr-all-view/pr-all-view.component';

import { PrDetailViewComponent } from './pr-detail-view/pr-detail-view.component';
import { PrGridViewComponent } from './pr-grid-view/pr-grid-view.component';
import { PrMinMaxComponent } from './pr-min-max/pr-min-max.component';
import { PrOverviewComponent } from './pr-overview/pr-overview.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'overview',
        component: PrOverviewComponent,
      },
      {
        path: 'detailed',
        component: PrDetailViewComponent,
      },
      {
        path: 'min-max',
        component: PrMinMaxComponent,
      },
      {
        path: 'pr-all',
        component: PrAllViewComponent,
      },
      {
        path: 'demo',
        component: DemoPageComponent,
      },
      { path: '', redirectTo: 'grid', pathMatch: 'full' },
      // { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseRequestRoutingModule {}
