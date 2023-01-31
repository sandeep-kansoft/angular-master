import { environment } from '@environments/environment';
export const baseUrl: string = environment.isMockApi ? '' : environment.apiUrl;

export const DashboardApiModule: any = {
  dashboardApi: 'api/businessdata/businessunit',
};