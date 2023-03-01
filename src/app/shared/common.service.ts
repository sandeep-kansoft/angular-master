import { EventEmitter, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private modalService: NgbModal) {}
  toasts: any = [];
  isMobileBrowser : boolean =  false;
  public toasterList$ = new BehaviorSubject([]);
  public currentToasterList$ = this.toasterList$.asObservable();

  //   public createButtonSubject$ = new BehaviorSubject("");
  //   public createButtonSubjectObs$ = this.toasterList$.asObservable();

  public sendData = new EventEmitter<any>();

  sendDataFromclassic(type: string) {
    this.sendData.emit(type);
  }

  clearToaster() {
    this.toasts.splice(0, this.toasts.length);
    this.toasterList$.next(this.toasts);
  }
  confirmationInfoModal() {
    this.clearToaster();
    return this.modalService
      .open(AlertModalComponent, { centered: true  , })
      .result.then(
        (result) => {},
        (reason) => {
          return reason;
        }
      );
  }

  removeToaster(toast: any) {
    this.toasts = this.toasts.filter((t: any) => t !== toast);
    this.toasterList$.next(this.toasts);
  }
  showToaster(comment: string, success: boolean, options: any = {}) {
  
    if (comment != null && comment != undefined && comment != '') {
      setTimeout(() => {
        this.toasts.push({ comment, success, ...options });
        this.toasterList$.next(this.toasts);
      }, 100);
    }
  }
  
  screenResize(width: any) {
    const maxWidth: number = 990;
    this.isMobileBrowser = width > maxWidth ? false : true;
  }
}
