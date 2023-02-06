import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './shared/services/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rqfcs';

  constructor(public translate: TranslateService,
    public themeService:ThemeService
    ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.themeService.applyMatTheme('rfqcs-custom');
  }
}
