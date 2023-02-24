import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrDetailViewComponent } from './pr-detail-view/pr-detail-view.component';
import { PrGridViewComponent } from './pr-grid-view/pr-grid-view.component';
import { PrOverviewComponent } from './pr-overview/pr-overview.component';

const routes: Routes = [
  {
    path: '',
    component: PrOverviewComponent,
    children: [
      {
        path: 'grid',
        component: PrGridViewComponent,
      },
      {
        path: 'detailed',
        component: PrDetailViewComponent,
      },
      { path: '', redirectTo: 'grid', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequestRoutingModule { }
