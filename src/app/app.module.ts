import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInterceptor } from './shared/interceptors/http-client/http-client.interceptor';
import { ErrorHandlerInterceptor } from './shared/interceptors/error-handler/error-handler.interceptor';
import { ErrorHandlerService } from './shared/services/error-handler/error-handler.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '@environments/environment';
import { FuseMockApiModule } from '@shared/lib/mock-api';
import { mockApiServices } from '@app/mock-api';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LayoutsModule } from './layouts/layouts.module';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.languagePath, '.json');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutsModule,
    SharedModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    FuseMockApiModule.forRoot(mockApiServices),
    ColorPickerModule
  ],
  providers: [ { provide: ErrorHandler, useClass: ErrorHandlerService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
