import { AzureData, User } from './types/user';


// Allow to retrieve a non-null User in logged-in routes
export const getLoggedInAuthState = (state: RootState) => ({
  ...state.auth,
  user: state.auth.user as User
});

export const serializeDate = (date: Date | null): number | null => {
  if (!date) return null;
  return Date.parse(date.toString());
};

export const clearAzureLocalStorageData = (azureData: AzureData) => {
  const localStorageKeys = Object.entries(localStorage).map(x => x[0]);
  const azureKeys = localStorageKeys.filter(x => x.includes(azureData.homeAccountId));

  azureKeys.map(key => localStorage.removeItem(key));
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
    'admin'
  ]
};
