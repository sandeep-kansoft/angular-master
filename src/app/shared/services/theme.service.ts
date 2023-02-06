import {
  Injectable,
  Inject,
  Renderer2,
  RendererFactory2,
  EventEmitter,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
//import { getQueryParam } from '../helpers/url.helper';

export interface ITheme {
  name: string;
  baseColor?: string;
  isActive?: boolean;
}

@Injectable()
export class ThemeService {
  public onThemeChange: EventEmitter<ITheme> = new EventEmitter();

  public rqfcsThemes: ITheme[] = [
    {
      name: 'rfqcs-custom',
      baseColor: '#fcfcfd',
      isActive: false,
    },
  ];

  public activatedTheme: any;
  private renderer: Renderer2;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // Invoked in AppComponent and apply 'activatedTheme' on startup
  applyMatTheme(themeName: string) {
    this.activatedTheme = this.rqfcsThemes.find((t) => t.name === themeName);
    this.flipActiveFlag(themeName);

    // this.changeTheme(themeName);
    this.renderer.addClass(this.document.body, themeName);
  }

  changeTheme(prevTheme: string, themeName: string) {
    this.renderer.removeClass(this.document.body, prevTheme);
    this.renderer.addClass(this.document.body, themeName);
    this.flipActiveFlag(themeName);
    this.onThemeChange.emit(this.activatedTheme);
  }

  flipActiveFlag(themeName: string) {
    this.rqfcsThemes.forEach((t) => {
      t.isActive = false;
      if (t.name === themeName) {
        t.isActive = true;
        this.activatedTheme = t;
      }
    });
  }
}
