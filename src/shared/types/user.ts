import { AccountInfo } from '@azure/msal-browser';


export type AzureData = AccountInfo;


export type User = {
  id: number,
  email: string,
  lastName: string,
  firstName: string,
  birthday?: string,

  campus?: string, // location of campus (city name)
  schoolYear?: string, // from first to fifth year of master

  azureData: AzureData // azure authentication data
};
