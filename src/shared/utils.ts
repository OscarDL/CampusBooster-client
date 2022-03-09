import { User } from './types/user';


export const getLoggedInAuthState = (state: RootState) => ({
  ...state.auth,
  user: state.auth.user as User
});

export const serializeDate = (date: Date | null): number | null => {
  if (!date) return null;
  return Date.parse(date.toString());
};


export const colors = {
  loader: '#3b2f92',
  accentRGB: '80, 60, 180'
};

export const values = {
  languages: [
    'en',
    'fr'
  ],

  categories: [
    'summary',
    'subjects',
    'marks',
    'students',
    'absences',
    'internships',
    'accounting',
    'administration'
  ]
};
