import { Configuration } from '@azure/msal-browser';


const azureAppClientId: string = process.env.REACT_APP_AZURE_APP_CLIENT_ID ?? '';


export const msalConfig: Configuration = {
  auth: {
    clientId: azureAppClientId
  },

  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
};

// Scope(s) for ID token to be used at Microsoft identity platform endpoints
export const loginRequest = {
  scopes: ['User.Read'],
  prompt: 'select_account'
};

// Endpoint(s) for Microsoft Graph API services
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me'
};
