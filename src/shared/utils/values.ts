import { PlanningType } from '../types/planning';
import { AppCategories } from '../types/routing';

export const colors = {
  accent: (mode: 'dark' | 'light') => mode === 'light' ? '#503cb4' : '#9682fa',
  calendarPicker: [
    PlanningType.Course.toLowerCase(),
    PlanningType.PracticeExam.toLowerCase(),
    PlanningType.OralExam.toLowerCase(),
    PlanningType.Today.toLowerCase()
  ]
};

// Do not include profile route here
export const categories = [
  AppCategories.Home,
  AppCategories.Grades,
  AppCategories.Courses,
  AppCategories.Planning,
  AppCategories.Absences,
  AppCategories.Contracts,
  AppCategories.Accounting,
  AppCategories.Users,
  AppCategories.Admin,
  AppCategories.Tools,
];

export const allowedFileTypes = {
  tools: [
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/x-icon',
    'image/svg+xml'
  ],

  absences: [
    'image/png',
    'image/jpeg',
    'application/pdf',
    'application/document'
  ],

  contracts: [
    'image/png',
    'image/jpeg',
    'application/pdf',
    'application/document'
  ]
};

export const maxImageSize = 2097152; // 2MB in bytes
export const maxDocumentSize = 5242880; // 5MB in bytes
export const maxNumberOfDocuments = 5; // 5 documents max. per request

export const maxYearlyCredits = 72;
export const requiredYearlyCredits = 60;

export const mobileWidthBreakpoint = 768;

export const reduxAuthPersistKey = 'auth-state';
export const localStorageKeysToPersist = ['lang', 'settings'];

export const azureDomainName = process.env.REACT_APP_AZURE_DOMAIN_NAME ?? '';
