import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { TranslationService } from './modules/i18n';
// language list
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as chLang } from './modules/i18n/vocabs/ch';
import { locale as esLang } from './modules/i18n/vocabs/es';
import { locale as jpLang } from './modules/i18n/vocabs/jp';
import { locale as deLang } from './modules/i18n/vocabs/de';
import { locale as frLang } from './modules/i18n/vocabs/fr';
import { ThemeModeService } from './_metronic/partials/layout/theme-mode-switcher/theme-mode.service';
import { CommonService } from './shared/services/common.service';
@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  screenWidth: number= 0;
  @HostListener('window:resize', ['$event']) onResize(event: any) {
    if (this.screenWidth != window.innerWidth) {
      this.screenWidth = window.innerWidth;
      const maxScreenWidth: number = 990,
        minScreenWidth: number = 768;
      if (
        !this.commonService.isMobileBrowser &&
        window.innerWidth <= maxScreenWidth
      ) {
        this.commonService.screenResize(window.innerWidth);
      }
      if (
        window.innerWidth > maxScreenWidth &&
        this.commonService.isMobileBrowser
      ) {
        this.commonService.isMobileBrowser = false;
      }
    }
  }
  constructor(
    private translationService: TranslationService,
    private modeService: ThemeModeService,    private commonService: CommonService
  ) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );
  }

  ngOnInit() {
    this.modeService.init();
    if(this.commonService.getAuthData())
    {
      this.commonService.callInitDataService();
    }
    else{

    }
  }
}
