import ReactDOM from 'react-dom';
import React, { Suspense } from 'react';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LoadTranslations from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { store } from './store/store';
import { Provider } from 'react-redux';

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
    supportedLngs: ['en', 'fr']
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
// LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_KEY);


ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div style={loading}/>}>
      <Provider store={store}>
        <App/>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
