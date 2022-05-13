import dayjs from 'dayjs';
import i18next from 'i18next';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react';
import { MsalProvider } from '@azure/msal-react';
import { initReactI18next } from 'react-i18next';
import { LicenseInfo } from '@mui/x-data-grid-pro';
import LoadTranslations from 'i18next-http-backend';
import { ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { PublicClientApplication } from '@azure/msal-browser';
import LanguageDetector from 'i18next-browser-languagedetector';

import { muiTheme } from './shared/theme';
import { msalConfig } from './azure/auth/config';
import { store, persistor } from './store/store';
import { getCurrentLang } from './shared/functions';
import { dayjsLocales, supportedLangs } from './shared/utils/locales';

import App from './components/App';
import reportWebVitals from './reportWebVitals';


i18next // Translation module
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(LoadTranslations)
  .init({
    backend: {
      loadPath: '/assets/locales/{{lng}}.json'
    },
    detection: {
      caches: ['localStorage'],
      lookupLocalStorage: 'lang',
      order: ['localStorage', 'navigator']
    },
    fallbackLng: 'en',
    supportedLngs: supportedLangs
  });


// Show blank page while translations load
const loading = {
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100wv',
  height: '100vh',
  position: 'fixed' as 'fixed',
  backgroundColor: 'transparent'
};


// Set Material-UI Pro License Key
// (add "REACT_APP_MUI_KEY" key with the license key value in the ".env" file + uncomment line below)
LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_KEY ?? '');


// Create a new MSAL instance for Azure authentication
const msalInstance = new PublicClientApplication(msalConfig);


// Set dayjs instance locale as current user language
dayjsLocales[getCurrentLang()]().then((d) => dayjs.locale(d.name));


ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div style={loading}/>}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MsalProvider instance={msalInstance}>
            <ThemeProvider theme={muiTheme}>
              <App/>  
            </ThemeProvider>
          </MsalProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
