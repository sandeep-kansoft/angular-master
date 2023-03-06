import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService } from 'src/app/shared/services/common.service';
import {
  baseUrl,
  PurchaseRequistionApi,
} from 'src/app/shared/constants/urlconfig';
import { AuthModel } from '../auth/models/auth.model';
import {
  PrHistoryResponseDto,
  PrLineHistoryResponseDto,
  PrLineResponseDto,
  PrResponseDto,
} from './purchase-requisition';

@Injectable({
  providedIn: 'root',
})
export class PurchaseRequistionServiceService {
  baseUrl: string = '';
  authData: AuthModel | null | undefined;

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.baseUrl = baseUrl;
    this.authData = this.commonService.getAuthData();
  }

  /**
   * @param pageSize
   * @param pageNumber
   * @return PrResponseDto
   */
  getMyPrList(
    pageSize: number,
    pageNumber: number
  ): Observable<PrResponseDto[]> {
    let url_ =
      this.baseUrl +
      '/' +
      PurchaseRequistionApi.prOverview +
      `/?UserId=${this.authData?.userId}&PageSize=${pageSize}&PageNo=${pageNumber}`;
    return this.http.get<PrResponseDto[]>(url_);
  }

  /**
   * @param   startDate: string,
   * @param  enddate: string,
   * @param  prNumber: string,
   * @param  pageSize: number,
   * @param pageSize
   * @param pageNumber
   * @return AllPr list
   */
  getALLPrList(payload: any): Observable<PrResponseDto[]> {
    let url_ = this.baseUrl + '/' + PurchaseRequistionApi.getAllPr;
    return this.http.post<PrResponseDto[]>(url_,payload);
  }

  /**
   * @param prid
   * @return PrResponseDto
   */
  getLineItem(prid: number): Observable<PrLineResponseDto[]> {
    let url_ =
      this.baseUrl +
      '/' +
      PurchaseRequistionApi.getPrLines +
      `/?UserId=${this.authData?.userId}&&PR_id=${prid}`;
    return this.http.get<PrLineResponseDto[]>(url_);
  }

  /**
   * @param prId
   * @return PrResponseDto
   */
  getPrHistory(prId: number): Observable<PrHistoryResponseDto[]> {
    let url_ =
      this.baseUrl +
      '/' +
      PurchaseRequistionApi.getPrHistory +
      `?UserId=${this.authData?.userId}&PrId=${prId}`;
    return this.http.get<PrHistoryResponseDto[]>(url_);
  }

  /**
   * @param pageSize
   * @param pageNumber
   * @return PrResponseDto
   */
  getPrLineHistory(itemCode: string): Observable<PrLineHistoryResponseDto[]> {
    let url_ =
      this.baseUrl +
      '/' +
      PurchaseRequistionApi.getPrLineHistory +
      `?Itemcode=${itemCode}`
      // `?UserId=${this.authData?.userId}&PrId=${prId}`;
    return this.http.get<PrLineHistoryResponseDto[]>(url_);
  }

  /**
   * @param pageSize
   * @param pageNumber
   * @return PrResponseDto
   */
  getPrLineHistoryHeader(prId: number): Observable<PrLineHistoryResponseDto[]> {
    let url_ =
      this.baseUrl +
      '/' +
      PurchaseRequistionApi.getPrLineHistoryHeader +
      `/?UserId=${this.authData?.userId}&PrId=${prId}`;
    return this.http.get<PrLineHistoryResponseDto[]>(url_);
  }

  /**
 * @param pageSize
 * @param pageNumber
 * @return PrResponseDto
 */
  getPrHeader(prId: number): Observable<PrLineHistoryResponseDto[]> {
    let url_ =
      this.baseUrl +
      '/' +
      PurchaseRequistionApi.getPrLineHistory +
      `/?UserId=${this.authData?.userId}&PrId=${prId}`;
    return this.http.get<PrLineHistoryResponseDto[]>(url_);
  }


  /**
* @param pageSize
* @param pageNumber
* @return PrResponseDto
*/
  getMinMax(pageSize:number, pageindex:number): Observable<PrLineHistoryResponseDto[]> {
    let url_ =
      this.baseUrl +
      '/' +
      PurchaseRequistionApi.getPendingPPO +
      `?PageSize=${pageSize}&PageIndex=${pageindex}`;
    return this.http.get<PrLineHistoryResponseDto[]>(url_);
  }

}
