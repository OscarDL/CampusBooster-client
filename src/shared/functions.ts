import dayjs from 'dayjs';

import { RootState } from '../store/store';
import { User, UserRoles } from './types/user';
import { supportedLangs } from './utils/locales';
import { AppCategories as AC } from './types/routing';
import { categories, localStorageKeysToPersist } from './utils/values';
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

// Save current url to session storage for redirect after login
export const saveRedirectUrl = (): void => {
  if (window.location.pathname !== '/login') {
    sessionStorage.setItem('redirectUrl', window.location.pathname);
  }
};

// Retrieve current user language
export const getCurrentLang = (): SupportedLangs => {
  const savedLang = localStorage.getItem('lang') as SupportedLangs;

  if (!supportedLangs.includes(savedLang)) {
    return SupportedLangs.English;
  }

  return savedLang as SupportedLangs;
};

// Retrieve current user link type
export const getCurrentLinkType = (linkType?: string): LinkTypes => {
  const settings = getLocalStorageSettings();
  if (!linkType) linkType = settings.linkType ?? LinkTypes.Default;

  switch (linkType) {
    case 'bold': return LinkTypes.Bold;
    case 'underline': return LinkTypes.Underline;
    case 'bold_underline': return LinkTypes.BoldUnderline;
    default: return LinkTypes.Default;
  }
};

// Update current user theme
export const getCurrentTheme = (theme: SupportedThemes, updateHTML?: boolean): ('dark' | 'light') => {
  const root = document.documentElement;

  switch (theme) {
    case 'dark': {
      updateHTML && root.classList.add('dark');
      return 'dark';
    }

    case 'light': {
      updateHTML && root.classList.remove('dark');
      return 'light';
    }

    default: {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        updateHTML && root.classList.add('dark');
        return 'dark';
      } else {
        updateHTML && root.classList.remove('dark');
        return 'light';
      }
    }
  }
};


// Allow to retrieve a non-null User in logged-in routes
export const getLoggedInAuthState = (state: RootState) => ({
  ...state.auth,
  user: state.auth.user as User
});


// Retrieve current app category
export const getCategoryTitle = (user: User) => {
  const category = window.location.pathname.replace('/', '').split('/').at(0);

  if (!getUserCategories(categories, user).find(c => c === category) && category !== AC.Profile) {
    return categories.find(c => c === AC.Home) + '.title';
  }

  return category + '.title';
};


// Retrieve categories accessible by current user
export const getUserCategories = (categories: AC[], user: User) => {
  const hiddenForStudents: AC[] = [AC.Admin, AC.Users];
  const hiddenForProfessors: AC[] = [AC.Admin, AC.Users, AC.Planning, AC.Accounting, AC.Absences, AC.Contracts];
  const hiddenForFullProfessors: AC[] = [AC.Admin, AC.Users, AC.Planning, AC.Accounting, AC.Absences, AC.Contracts];
  const hiddenForCompanies: AC[] = [AC.Admin, AC.Users, AC.Planning, AC.Accounting, AC.Tools, AC.Absences];
  const hiddenForAssistants: AC[] = [AC.Planning];
  const hiddenForCampusManagers: AC[] = [AC.Planning];
  const hiddenForCampusBoosterAdmins: AC[] = [AC.Planning];

  switch (user.role) {
    case UserRoles.Professor: {
      return categories.filter(category => !hiddenForProfessors.includes(category));
    }

    case UserRoles.FullProfessor: {
      return categories.filter(category => !hiddenForFullProfessors.includes(category));
    }

    case UserRoles.Company: {
      return categories.filter(category => !hiddenForCompanies.includes(category));
    }

    case UserRoles.Assistant: {
      return categories.filter(category => !hiddenForAssistants.includes(category));
    }

    case UserRoles.CampusManager: {
      return categories.filter(category => !hiddenForCampusManagers.includes(category));
    }

    case UserRoles.CampusBoosterAdmin: {
      return categories.filter(category => !hiddenForCampusBoosterAdmins.includes(category));
    }

    default: {
      return categories.filter(category => !hiddenForStudents.includes(category));
    }
  };
};


export const getCurrentUserYear = (user: User): number => {
  let monthsToAdd = 3;
  const promotion = user.promotion ?? dayjs().year();

  // Year 1 students start in october, others start in november -> calculate year
  if (dayjs().add(monthsToAdd, 'month').year() - promotion > 1) monthsToAdd -= 1;

  return dayjs().add(monthsToAdd, 'month').year() - promotion;
};


export const userHasHigherRole = (loggedInUser: User, role: UserRoles, excludeSameRole?: boolean) => {
  const {
    CampusBoosterAdmin: cba, CampusManager: cm, Assistant: a,
    Company: c, FullProfessor: fp, Professor: p, Student: s
  } = UserRoles;

  switch (loggedInUser.role) {
    case cba: return false;
    case cm: return [cba].concat(excludeSameRole ? cm : []).includes(role);
    case a: return [cba, cm].concat(excludeSameRole ? a : []).includes(role);
    // company is not superior to professors
    case c: return [cba, cm, a].concat(excludeSameRole ? c : []).includes(role);
    case fp: return [cba, cm, a].concat(excludeSameRole ? fp : []).includes(role);
    case p: return [cba, cm, a, fp].concat(excludeSameRole ? p : []).includes(role);
    case s: return [cba, cm, a, c, fp, p].concat(excludeSameRole ? s : []).includes(role);
  };
};


export const userNeedsCampus = (role: UserRoles) => (
  [UserRoles.Student, UserRoles.Company, UserRoles.Assistant, UserRoles.CampusManager].includes(role)
);


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


// Check if user role is included in these administrative / management roles
export const userHasAdminRights = (role: UserRoles) => (
  [UserRoles.Assistant, UserRoles.CampusManager, UserRoles.CampusBoosterAdmin].includes(role)
);
