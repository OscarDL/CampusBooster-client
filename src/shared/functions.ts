import { AzureData, User } from './types/user';
import { values } from './utils';


// Allow to retrieve a non-null User in logged-in routes
export const getLoggedInAuthState = (state: RootState) => ({
  ...state.auth,
  user: state.auth.user as User
});


// Retrieve current app section
export const getCategoryTitle = () => (
  window.location.pathname.replace('/', '').split('/')[0] + '.title'
);


// Retrieve current user theme
export const getCurrentTheme = () => {
  if (localStorage.getItem('theme')) {
    return localStorage.getItem('theme') === 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};


// Retrieve categories accessible by current user
export const getUserCategories = (categories: string[], user: User) => {
  const studentForbidden: string[] = ['admin'];
  const professorForbidden: string[] = ['admin'];
  const fullProfessorForbidden: string[] = ['admin'];
  const companyForbidden: string[] = ['admin'];
  const adminForbidden: string[] = [];
  const cbAdminForbidden: string[] = [];

  switch (user.role) {
    case values.roles.professor: {
      return categories.filter(category => !professorForbidden.includes(category));
    }

    case values.roles.fullProfessor: {
      return categories.filter(category => !fullProfessorForbidden.includes(category));
    }

    case values.roles.company: {
      return categories.filter(category => !companyForbidden.includes(category));
    }

    case values.roles.administration: {
      return categories.filter(category => !adminForbidden.includes(category));
    }

    case values.roles.campusBoosterAdmin: {
      return categories.filter(category => !cbAdminForbidden.includes(category));
    }

    default: {
      return categories.filter(category => !studentForbidden.includes(category));
    }
  };
};


// Hide or show shadow above prompt actions if not scrolled to the bottom
export const handlePromptScrollShadow = (initialCheck: boolean) => {
  const prompt = document.querySelector('.prompt__wrapper');
  if (!prompt) return;
  
  const actions = document.querySelector('.prompt__actions') as HTMLElement;
  // Adding 1 is necessary because display scaling can give decmial undervalues.
  const isBottom = (prompt.scrollTop + 1) >= prompt.scrollHeight - prompt.clientHeight;

  if (!initialCheck) actions.style.transition = 'box-shadow 0.25s';
  actions.style.boxShadow = isBottom ? 'none' : '';
};


// Clear local storage values set by Microsoft for Azure login
export const clearAzureLocalStorageData = (azureData: AzureData) => {
  // In order to logout from the website without logging out from Azure,
  // We have to clear the localStorage keys that Azure sets up on login.

  // --- /!\ Do NOT store any data with the key containing the homeAccountId (object ID) /!\ ---
  // If we store the homeAccountId in localStorage, we have to store it as a value, not key. ---

  const localStorageKeys = Object.entries(localStorage).map(x => x[0]);
  const azureKeys = localStorageKeys.filter(x => x.includes(azureData.homeAccountId));

  azureKeys.map(key => localStorage.removeItem(key));
};
