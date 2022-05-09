import { AccountInfo } from '@azure/msal-browser';


export type AzureData = AccountInfo;

export type UserRoles = 'STUDENT' |
                        'PROFESSOR' |
                        'FULL_PROFESSOR' |
                        'COMPANY' |
                        'ASSISTANT' |
                        'CAMPUS_MANAGER' |
                        'CAMPUS_BOOSTER_ADMIN';

export type User = {
  id: number,
  
  email: string,
  avatar?: string,
  lastName: string,
  firstName: string,
  birthday?: string,
  
  role: UserRoles, // role / type of person at Supinfo
  campus?: string, // location of campus (city name)
  schoolYear?: string, // from first to fifth year of master

  azureData: AzureData // azure authentication data
};
