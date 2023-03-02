import { environment } from 'src/environments/environment';

export const baseUrl: string = environment.isMockEnabled
  ? 'api'
  : environment.apiUrl;

export const LoginApi: any = {
  login: 'api/Login/Authenticate',
};
