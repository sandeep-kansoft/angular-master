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
  getPrHistory: 'api/PR/GetPR_History',
  getAllPr: 'api/PR/GetAllPR',
  getPrLines: 'api/PR/GetPR_Lines',
  getPrLineHistory: 'api/PR/GetPRLine_History',
  getPrLineHistoryHeader: 'api/PR/GetPRDetails_ById',
  getPendingPPO :"api/PPO/GetPendingPPO"
};
