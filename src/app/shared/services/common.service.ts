import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthModel } from '../../modules/auth/models/auth.model';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { baseUrl, commonApiModule } from '../constants/urlconfig';
import { IMenuDataDto, IMenuResponseDataDto } from './common.interface';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  toasts: any = [];
  isMobileBrowser: boolean = false;
  public toasterList$ = new BehaviorSubject([]);
  public currentToasterList$ = this.toasterList$.asObservable();
  baseUrl:string;
  menuApiResponse:IMenuDataDto[];
  isAppHeader:boolean=false;
  public menuList$ = new BehaviorSubject([]);
  public menuListData$ = this.menuList$.asObservable();
  
  constructor(private modalService: NgbModal,
    private http: HttpClient,
    private router:Router
    ) { 
    this.baseUrl= `${baseUrl}/${commonApiModule.usersApi}`
  }


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
      .open(AlertModalComponent, { centered: true, })
      .result.then(
        (result) => { },
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


  getAuthData(): AuthModel | undefined | null {
    let item = localStorage.getItem(`${environment.appVersion}-${environment.USERDATA_KEY}`)
    if (item) {
      let authData: AuthModel = JSON.parse(item)
      return authData
    }
    return null
  }


  //call initData service
  callInitDataService() {
    forkJoin([
      this.getMenuData().pipe(map((res) => res), catchError(e => of(e))),
      this.getPermissionDataByUserId().pipe(map((res) => res), catchError(e => of(e)))
    ]).subscribe({
      next: (response: any) => 
      {
          this.setMenuData(response[0 ].data);
      },
      error: (error: any) => {
        this.showToaster(error?.error, false)

      }
    });
  }

  setMenuData(menuData: IMenuDataDto[]) {
    let pageName = this.router.url.split('/').length >= 2 ? this.router.url.split('/')[1] : this.router.url;
    let parentMenuData: any = menuData;
    this.menuApiResponse = menuData;
    menuData.filter((element) => {
      if (element.childmenu) {
        element.childmenu = element.childmenu.filter((o:any) => {
       
          this.getCorrectPath(
            './assets/images/menu-icons/' + o.menuCode + '.svg'
          ).then((result: any) => {
            o.filePath = result
              ? result
              : './assets/images/menu-icons/Home.svg';
          });
          return o;
        });
      }
      else {
        if ((element.menuCode) == pageName) {
          this.isAppHeader = false;
        }
      }
      this.getCorrectPath(
        './assets/images/menu-icons/' + element.menuCode + '.svg'
      ).then((result: any) => {
        element.filePath = result
          ? result
          : './assets/images/menu-icons/Home.svg';
      });
      return element;
    });

    this.menuList$.next(parentMenuData);
  }

    /**
   * @param filePath
   * @return file path or default file location
   */
    getCorrectPath(imageUrl: string) {
      // check the image path and callback the respose
      function imageExists(url: string, callback: any) {
        var img = new Image();
        img.onload = function () {
          callback(true);
        };
        img.onerror = function () {
          callback(false);
        };
        img.src = url;
      }
      // calling the image exists function.
      return new Promise((resolve, reject) => {
        imageExists(imageUrl, function (exists: any) {
          if (exists) {
            resolve(imageUrl);
          } else {
            resolve(null);
          }
        });
      });
    }


    /**
   * @return Success
   */
    getMenuData(): Observable<IMenuResponseDataDto> {
      let url_ = this.baseUrl + '/GetAllMenuItems';
      return this.http.get<IMenuResponseDataDto>(url_);
    }

     /**
   * @return Success
   */
     getPermissionDataByUserId(): Observable<IMenuDataDto> {
      let url_ = this.baseUrl + '/GetPermissionsByUserId';
      return this.http.get<IMenuDataDto>(url_);
    }




}
