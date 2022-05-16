import { AccountInfo } from '@azure/msal-browser';

import { Campus } from './campus';
import { UserHasClassroom } from './classroom';


export type AzureData = AccountInfo;

export enum UserRoles {
  student = 'STUDENT',
  professor = 'PROFESSOR',
  fullProfessor = 'FULL_PROFESSOR',
  company = 'COMPANY',
  assistant = 'ASSISTANT',
  campusManager = 'CAMPUS_MANAGER',
  campusBoosterAdmin = 'CAMPUS_BOOSTER_ADMIN'
};

export type User = {
  id: number,
  role: UserRoles,
  active: boolean,
  validated: boolean,
  
  email: string,
  avatar?: string,
  lastName: string,
  firstName: string,
  birthday?: string,

  Campus?: Campus, // campus info
  campusId: number, // campus id
  UserHasClassrooms?: UserHasClassroom[],

  azureData: AzureData // azure authentication data
};

export type UserRequest = {
  email: string,
  role: UserRoles,
  avatar?: string,
  birthday: string,
  lastName: string,
  firstName: string,

  campusId: number, // campus id
  schoolYear?: number, // from year 1 to 5

  azureData: AzureData // azure authentication data
};
