import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ToasterComponent } from "./toaster/toaster.component"
import { NgbActiveOffcanvas, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from "./alert-modal/alert-modal.component";
import { SkeletonListComponent } from "./skeleton-list/skeleton-list.component";



const components = [
   ToasterComponent,
   AlertModalComponent,
   SkeletonListComponent
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule
   
  ],
  providers: [NgbActiveOffcanvas],
  exports: [components],
})
export class SharedComponentsModule { }
