import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { GridModule } from '@progress/kendo-angular-grid';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { Select2Module } from 'ng-select2-component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TokenInterceptor } from './shared/interceptors/token.interceptors';
import { ErrorInterceptor } from './shared/interceptors/error.interceptors';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { ErrorHandlerService } from './shared/error-handler.service';
import { MinMaxPrPurchaseOrderComponent } from './modules/purchase-requisition/min-max-pr-purchase-order/min-max-pr-purchase-order.component';

// #fake-end#

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent, MinMaxPrPurchaseOrderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    GridModule,
    PDFModule,
    ExcelModule,
    ClipboardModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    SharedComponentsModule,
    Select2Module,
    NgxSkeletonLoaderModule.forRoot(),
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
