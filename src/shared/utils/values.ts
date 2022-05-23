export const colors = {
  accent: '#503cb4',
  accentRGB: '80, 60, 180',
  calendarPicker: ['course', 'exam', 'oral', 'today']
};

export const reduxAuthPersistKey = 'auth-state';

export const categories = [
  'summary',
  'grades',
  'subjects',
  'users',
  'planning',
  'absences',
  'internships',
  'accounting',
  'admin',
  'tools',
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

export const maxMobileWidth = 768;

export const localStorageKeysToPersist = ['lang', 'settings'];

export const azureDomainName = process.env.REACT_APP_AZURE_DOMAIN_NAME ?? '';
