export const colors = {
  accent: '#503cb4',
  accentRGB: '80, 60, 180',
  datePicker: ['course', 'exam', 'absence', 'today']
};

export const reduxAuthPersistKey = 'auth-state';

export const roles = {
  student: "STUDENT",
  professor: "PROFESSOR",
  fullProfessor: "FULL_PROFESSOR",
  company: "COMPANY",
  assistant: "ASSISTANT",
  campusManager: "CAMPUS_MANAGER",
  campusBoosterAdmin: "CAMPUS_BOOSTER_ADMIN"
};

export const categories = [
  'summary',
  'subjects',
  'marks',
  'members',
  'calendar',
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
