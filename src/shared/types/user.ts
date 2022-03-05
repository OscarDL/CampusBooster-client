import { AccountInfo } from '@azure/msal-browser';


export type AzureUser = AccountInfo;


export type User = {
  id: number,
  name: string,
  email: string,
  azureUser: AzureUser
};
