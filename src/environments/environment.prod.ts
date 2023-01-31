import { config } from "src/config";

export const environment = {
  production: true,
  apiUrl: config.apiUrlProd,
  isMockApi : false,
  languagePath: './assets/i18n/',
};
