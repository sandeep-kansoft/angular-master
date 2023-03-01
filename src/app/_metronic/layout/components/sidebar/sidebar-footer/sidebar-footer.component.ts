import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-sidebar-footer',
  templateUrl: './sidebar-footer.component.html',
  styleUrls: ['./sidebar-footer.component.scss'],
})
export class SidebarFooterComponent implements OnInit {
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;

  constructor(private auth: AuthService, private chr: ChangeDetectorRef) {}

  ngOnInit(): void {}
  logout() {
    this.auth.logout();
    document.location.reload();
    this.chr.detectChanges();
  }
}
