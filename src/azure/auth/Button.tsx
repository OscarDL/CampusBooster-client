import { useState } from 'react';
import { AccountInfo } from '@azure/msal-browser';

import AzureAuthContext from './context';


const authModule = new AzureAuthContext();


const AzureAuthButton = ({ onAuthenticated }: any): JSX.Element => {
  const [user, setUser] = useState<AccountInfo>();
  const [authenticated, setAuthenticated] = useState<Boolean>(false);


  const handleLogin = (): any => {
    // Instantiate Azure login process
    authModule.login('loginPopup', returnedAccountInfo);
  };

  const handleLogout = (): any => {
    if (user) {
      // Instantiate Azure logout process
      onAuthenticated(undefined);
      authModule.logout(user);

      // Mitigate login error after logging out
      sessionStorage.removeItem('msal.interaction.status');
    }
  };


  const returnedAccountInfo = (user: AccountInfo) => {
    // set state
    setAuthenticated(user?.name ? true : false);
    onAuthenticated(user);
    setUser(user);
  };


  const loginButton = (): any => {
    return (
      <button id="azure-login-btn" onClick={handleLogin}>
        Log in
      </button>
    );
  };

  const logoutButton = (): any => {
    return (
      <button id="azure-logout-btn" onClick={handleLogout}>
        Log out
      </button>
    );
  };


  return (
    <div id="azure-auth">
      {authModule.isAuthenticationConfigured ? (
        authenticated ? logoutButton() : loginButton()
      ) : (
        <div>Authentication Client ID is not configured.</div>
      )}
    </div>
  );
};


export default AzureAuthButton;
