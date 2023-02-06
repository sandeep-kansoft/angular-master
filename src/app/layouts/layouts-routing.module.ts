import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { LoginComponent } from "./login/login.component";

export const AdminLayoutsRoutes: Routes = [{
    path: 'admin', component: AdminLayoutComponent, data: { title: 'Login' },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../views/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
    ] 
  }];
  