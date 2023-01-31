import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOnlyDirectiveDirective } from './number-only-directive/number-only-directive.directive';



@NgModule({
  declarations: [NumberOnlyDirectiveDirective],
  imports: [
    CommonModule
  ],
  exports: [NumberOnlyDirectiveDirective],
})
export class DirectivesModule { }
