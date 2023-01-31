import { config } from "src/config";

export const environment = {
  production: false,
  apiUrl: config.apiUrlProd,
  isMockApi : false,
  languagePath: './assets/i18n/',
};
