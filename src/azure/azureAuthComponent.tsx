import { useState } from 'react';
import { AccountInfo } from '@azure/msal-browser';

import AzureAuthenticationContext from './azureAuthContext';


const ua = window.navigator.userAgent;
const msie = ua.indexOf('MSIE ');
const msie11 = ua.indexOf('Trident/');
const isIE = msie > 0 || msie11 > 0;


// Log In, Log Out button
const AzureAuthenticationButton = ({ onAuthenticated }: any): JSX.Element => {
  // Azure client context
  const authModule = new AzureAuthenticationContext();

  const [user, setUser] = useState<AccountInfo>();
  const [authenticated, setAuthenticated] = useState<Boolean>(false);


  const logIn = (method: string): any => {
    const typeName = method ?? 'loginPopup';
    const logInType = isIE ? 'loginRedirect' : typeName;

    // Azure Login
    authModule.login(logInType, returnedAccountInfo);
  };

  const logOut = (): any => {
    if (user) {
      onAuthenticated(undefined);
      // Azure Logout
      authModule.logout(user);
    }
  };


  const returnedAccountInfo = (user: AccountInfo) => {
    // set state
    setAuthenticated(user?.name ? true : false);
    onAuthenticated(user);
    setUser(user);
  };


  const showLogInButton = (): any => {
    return (
      <button id="authenticationButton" onClick={() => logIn('loginPopup')}>
        Log in
      </button>
    );
  };

  const showLogOutButton = (): any => {
    return (
      <div id="authenticationButtonDiv">
        <div id="authentication">
          <button id="authenticationButton" onClick={() => logOut()}>
            Log out
          </button>
        </div>
      </div>
    );
  };

  const showButton = (): any => {
    return authenticated ? showLogOutButton() : showLogInButton();
  };


  return (
    <div id="authentication">
      {authModule.isAuthenticationConfigured ? (
        showButton()
      ) : (
        <div>Authentication Client ID is not configured.</div>
      )}
    </div>
  );
};


export default AzureAuthenticationButton;
