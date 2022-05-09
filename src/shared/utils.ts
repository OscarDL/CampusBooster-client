import { SupportedLangs } from './types/settings';


export const colors = {
  accent: '#503cb4',
  accentRGB: '80, 60, 180',
  datePicker: ['course', 'exam', 'absence', 'today']
};


export const dayjsLocales = {
  en: () => import('dayjs/locale/en'),
  fr: () => import('dayjs/locale/fr')
};


const supportedLangs: SupportedLangs[] = ['en', 'fr'];
export const values = {
  supportedLangs,
  authPersistKey: 'auth-state',

  roles: {
    student: "STUDENT",
    professor: "PROFESSOR",
    fullProfessor: "FULL_PROFESSOR",
    company: "COMPANY",
    assistant: "ASSISTANT",
    campusManager: "CAMPUS_MANAGER",
    campusBoosterAdmin: "CAMPUS_BOOSTER_ADMIN"
  },

  categories: [
    'summary',
    'subjects',
    'marks',
    'members',
    'calendar',
    'internships',
    'accounting',
    'admin',
    'tools',
  ],

  maxMobileWidth: 768
};

export const localStorageKeysToPersist = ['lang', 'settings'];
