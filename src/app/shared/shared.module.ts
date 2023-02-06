import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeService } from './services/theme.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    DirectivesModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers:[
    ThemeService
  ],
  exports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
