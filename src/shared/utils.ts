import { AzureData, User } from './types/user';


// Allow to retrieve a non-null User in logged-in routes
export const getLoggedInAuthState = (state: RootState) => ({
  ...state.auth,
  user: state.auth.user as User
});

export const getCategoryTitle = () => (
  window.location.pathname.replace('/', '').split('/')[0] + '.title'
);

export const handlePromptScrollShadow = (initialCheck: boolean) => {
  const prompt = document.querySelector('.prompt__wrapper');
  if (!prompt) return;
  
  const actions = document.querySelector('.prompt__actions') as HTMLElement;
  // Adding 1 is necessary because display scaling can give decmial undervalues.
  const isBottom = (prompt.scrollTop + 1) >= prompt.scrollHeight - prompt.clientHeight;

  if (!initialCheck) actions.style.transition = 'box-shadow 0.25s';
  actions.style.boxShadow = isBottom ? 'none' : '';
};

export const serializeDate = (date: Date | null): number | null => {
  if (!date) return null;
  return Date.parse(date.toString());
};

export const clearAzureLocalStorageData = (azureData: AzureData) => {
  // In order to logout from the website without logging out from Azure,
  // We have to clear the localStorage keys that Azure sets up on login.

  // --- /!\ Do NOT store any data with the key containing the homeAccountId (object ID) /!\ ---
  // If we store the homeAccountId in localStorage, we have to store it as a value, not key. ---

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

  roles: {
    student: 1,
    professor: 2,
    fullProfessor: 3,
    company: 4,
    administration: 5,
    campusBoosterAdmin: 6
  },

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
