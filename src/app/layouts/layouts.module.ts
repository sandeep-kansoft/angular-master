import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AdminLayoutsRoutes } from './layouts-routing.module';
import { LoginComponent } from './login/login.component';

const components =[AdminLayoutComponent,LoginComponent]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AdminLayoutsRoutes)
  ],
  exports:[
    components
  ]
})
export class LayoutsModule { }
