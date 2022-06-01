import { AppCategories } from "../types/routing";

export const colors = {
  accent: '#503cb4',
  accentRGB: '80, 60, 180',
  calendarPicker: ['course', 'exam', 'oral', 'today']
};

export const reduxAuthPersistKey = 'auth-state';

// Do not include profile route here
export const categories = [
  AppCategories.Home,
  AppCategories.Grades,
  AppCategories.Courses,
  AppCategories.Users,
  AppCategories.Planning,
  AppCategories.Absences,
  AppCategories.Internships,
  AppCategories.Accounting,
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
  ]
};

export const mobileWidthBreakpoint = 768;

export const localStorageKeysToPersist = ['lang', 'settings'];

export const azureDomainName = process.env.REACT_APP_AZURE_DOMAIN_NAME ?? '';
