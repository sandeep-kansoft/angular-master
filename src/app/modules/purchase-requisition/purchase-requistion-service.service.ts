import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { baseUrl, PurchaseRequistionApi } from 'src/app/shared/constants/urlconfig';
import { AuthModel } from '../auth/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequistionServiceService {

  baseUrl: string = ''
  authData: AuthModel | null | undefined;

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.baseUrl = baseUrl;
    this.authData = this.commonService.getAuthData()
  }

  /**
   * @param entityStatus
   * @return Success
   */
  getMyPrList(pageSize: number, pageNumber: number): Observable<any> {
    let url_ = this.baseUrl + '/' + PurchaseRequistionApi.prOverview + `/?UserId=${this.authData?.userId}&PageSize=${pageSize}&PageNo=${pageNumber}`;
    return this.http.get<any>(url_);
  }


}  
