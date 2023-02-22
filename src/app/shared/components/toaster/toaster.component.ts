import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  toaster: any = [];
  constructor(private commonService: CommonService) {}
  ngOnInit(): void {
    this.commonService.currentToasterList$.subscribe({
      next: (toaster) => {
        this.toaster = toaster;
      },
    });
  }
  ngOnDestroy(): void {
    this.commonService.clearToaster();
  }
  closeToast(toast: any) {
    this.commonService.removeToaster(toast);
  }
  removeToaster(toast: any) {
    this.commonService.removeToaster(toast);
  }
}
