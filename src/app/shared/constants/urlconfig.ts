import { environment } from 'src/environments/environment';

export const baseUrl: string = environment.isMockEnabled
  ? 'api'
  : environment.apiUrl;

export const LoginApi: any = {
  login: 'api/Login/Authenticate',
};


export const commonApiModule:any ={
  usersApi:'api/Users'
}
export const PurchaseRequistionApi: any = {
  prOverview: 'api/PR/GetMy_PRList',
  getAllPr: 'api/PR/GetAllPR',
  getPrLines: 'api/PR/GetPR_Lines',
  getPrHistory: 'api/PR/GetPR_History',
  getPrLineHistory: 'api/PR/GetPRDetails_ById',
};
