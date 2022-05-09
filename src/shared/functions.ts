import { User } from './types/user';
import { RootState } from '../store/store';
import { localStorageKeysToPersist, values } from './utils';
import { LinkTypes, Settings, SupportedLangs, SupportedThemes } from './types/settings';


/* --- SETTINGS --- */

// Retrieve current user settings from local storage
export const getLocalStorageSettings = () => JSON.parse(localStorage.getItem('settings') || '{}');

// Update user settings in local storage
export const updateLocalStorageSettings = (key: keyof Settings, value: any): void => {
  const settings = getLocalStorageSettings();
  settings[key] = value;
  localStorage.setItem('settings', JSON.stringify(settings));
};

// Retrieve current user language
export const getCurrentLang = (): SupportedLangs => {
  const savedLang = localStorage.getItem('lang') as SupportedLangs;

  if (!values.supportedLangs.includes(savedLang)) {
    return 'en';
  }

  return savedLang as SupportedLangs;
};

// Retrieve current user link type
export const getCurrentLinkType = (linkType?: string): LinkTypes => {
  const settings = getLocalStorageSettings();
  if (!linkType) linkType = settings.linkType ?? 'default';

  switch (linkType) {
    case 'bold': return 'bold';
    case 'underline': return 'underline';
    case 'bold-underline': return 'bold-underline';
    default: return 'default';
  }
};

// Update current user theme
export const updateThemeHTML = (theme: SupportedThemes) => {
  const root = document.documentElement;

  switch (theme) {
    case 'dark': {
      root.classList.add('dark');
      break;
    }

    case 'light': {
      root.classList.remove('dark');
      break;
    }

    default: {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }
};


// Allow to retrieve a non-null User in logged-in routes
export const getLoggedInAuthState = (state: RootState) => ({
  ...state.auth,
  user: state.auth.user as User
});


// Retrieve current app section
export const getCategoryTitle = (user: User) => {
  const category = window.location.pathname.replace('/', '').split('/')[0];

  if (!getUserCategories(values.categories, user).find(c => c === category) && category !== 'profile') {
    return values.categories.find(c => c === 'summary') + '.title';
  }

  return category + '.title';
};


// Retrieve categories accessible by current user
export const getUserCategories = (categories: string[], user: User) => {
  const studentForbidden: string[] = ['admin'];
  const professorForbidden: string[] = ['admin'];
  const fullProfessorForbidden: string[] = ['admin'];
  const companyForbidden: string[] = ['admin'];
  const assistantForbidden: string[] = [];
  const campusManagerForbidden: string[] = [];
  const campusBoosterAdminForbidden: string[] = [];

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

    case values.roles.assistant: {
      return categories.filter(category => !assistantForbidden.includes(category));
    }

    case values.roles.campusManager: {
      return categories.filter(category => !campusManagerForbidden.includes(category));
    }

    case values.roles.campusBoosterAdmin: {
      return categories.filter(category => !campusBoosterAdminForbidden.includes(category));
    }

    default: {
      return categories.filter(category => !studentForbidden.includes(category));
    }
  };
};


export const getUrlDomain = (url: string): string => {
  if (url.startsWith('http')) {
    const https = url.startsWith('https://');
    url = url.substring(https ? 8 : 7);

    const end = url.includes('/') ? url.indexOf('/') : url.length;
    return url.substring(0, end);
  }

  const end = url.endsWith('/') ? url.indexOf('/') : url.length;
  return url.substring(0, end);
};


// Hide or show shadow below content header depending on content body scroll
export const handleHeaderScrollShadow = (): void => {
  const body = document.querySelector('.app__content > div > .content__body') as HTMLElement;
  const header = document.querySelector('.app__content > div > .content__header') as HTMLElement;
  if (!body || !header) return;

  body.scrollTop > 0 ? header.classList.add('elevated') : header.classList.remove('elevated');
};


// Hide or show shadow above prompt actions if not scrolled to the bottom
export const handleDialogScrollShadow = () => {
  const prompt = document.querySelector('.MuiDialogContent-root');
  if (!prompt) return;
  
  const title = document.querySelector('.MuiDialogTitle-root') as HTMLElement;
  const actions = document.querySelector('.MuiDialogActions-root') as HTMLElement;
  
  // Adding 1 is necessary because display scaling can give decmial undervalues.
  const isBottom = (prompt.scrollTop + 1) >= prompt.scrollHeight - prompt.clientHeight;
  const isTop = prompt.scrollTop <= 1;

  actions.style.boxShadow = isBottom ? 'none' : '';
  title.style.boxShadow = isTop ? 'none' : '';
};


// Clear local storage values set by Microsoft for Azure login
export const clearAzureLocalStorageData = () => {
  // In order to logout from the website without logging out from Azure,
  // We have to clear the localStorage keys that Azure sets up on login.

  // --- /!\ Do NOT store any data with the key containing the homeAccountId (object ID) /!\ ---
  // If we store the homeAccountId in localStorage, we have to store it as a value, not key. ---

  const localStorageKeys = Object.entries(localStorage).map(kv => kv[0]);
  const azureKeys = localStorageKeys.filter(key => !localStorageKeysToPersist.includes(key));

  azureKeys.map(key => localStorage.removeItem(key));
};
