import { ThemeProvider } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

import { getMuiTheme } from '../shared/theme';
import { login } from '../store/features/auth/slice';
import { isTouchDevice } from '../views/shared/Drawer';
import { setCategory } from '../store/features/app/slice';
import { useAppSelector, useAppDispatch } from '../store/store';
import { LinkTypes, SupportedThemes } from '../shared/types/settings';
import { getCategoryTitle, getCurrentTheme, saveRedirectUrl } from '../shared/functions';

import Loader from './shared/loader/Loader';
import LoggedInRoutes from '../routes/LoggedInRoutes';
import LoggedOutRoutes from '../routes/LoggedOutRoutes';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


const cleanLinkTypeClass = (root: HTMLElement) => {
  for (let i = 0; i < root.classList.length; i++) {
    const className = root.classList[i];
    if (className.startsWith('link-')) root.classList.remove(className);
  };
};


const App: FC = () => {
  const dispatch = useAppDispatch();
  const { accounts: [azureData] } = useMsal();
  const { user } = useAppSelector(state => state.auth);
  const { settings } = useAppSelector(state => state.app);

  const [currTheme, setCurrTheme] = useState(getCurrentTheme(settings.theme));


  // Keep classes on HTML root element up-to-date
  useEffect(() => {
    const newTheme = getCurrentTheme(settings.theme, true);
    setCurrTheme(newTheme);

    const browser = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = (e: MediaQueryListEvent) => {
      const newTheme = getCurrentTheme(SupportedThemes[e.matches ? 'Dark' : 'Light'], true);
      setCurrTheme(newTheme);
    };

    if (settings.theme === SupportedThemes.System) browser.addEventListener('change', updateTheme);
    return () => browser.removeEventListener('change', updateTheme);
  }, [settings.theme]);

  useEffect(() => {
    const root = document.documentElement;
    cleanLinkTypeClass(root);

    const linkType = settings.linkType;
    if (linkType !== LinkTypes.Default) root.classList.add('link-' + linkType);
  }, [settings.linkType]);

  useEffect(() => {
    if (!user) {
      if (azureData) {
        dispatch(login(azureData));
      } else {
        saveRedirectUrl();
        // Redirect to correct route after login
      }
    }

    else {
      dispatch(setCategory(getCategoryTitle(user)));
    }
  }, [azureData, user, dispatch]);

  return (
    <div className="app">
      <ThemeProvider theme={getMuiTheme(currTheme)}>
        <Router>
          <AuthenticatedTemplate>
            {user ? (
              <LoggedInRoutes/>
            ) : (
              // User data is not retrieved from the database yet
              <Loader fullScreen/>
            )}
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <LoggedOutRoutes/>
          </UnauthenticatedTemplate>
        </Router>

        <ToastContainer
          theme="colored" autoClose={3000} transition={Slide}
          position={isTouchDevice() ? 'top-center' : 'top-right'}
        />
      </ThemeProvider>
    </div>
  );
};


export default App;
