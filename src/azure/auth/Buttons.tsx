import { useSelector } from 'react-redux';

import AzureAuthContext from './context';
import { getLoggedInAuthState } from '../../shared/utils';


const authModule = new AzureAuthContext();


export const LoginButton = ({ handleLogin }: any): JSX.Element => {
  const handleAzureLogin = (): any => {
    // Instantiate Azure login process
    authModule.login('loginPopup', handleLogin);
  };


  return (
    <button id="azure-login-btn" onClick={handleAzureLogin}>
      Log in
    </button>
  );
};


export const LogoutButton = ({ handleLogout, logoutFromMsAccount = false }: any) => {
  const {user} = useSelector(getLoggedInAuthState);

  const handleAzureLogout = (): any => {
    if (user) {
      // Mitigate login error after logging out
      sessionStorage.removeItem('msal.interaction.status');

      if (logoutFromMsAccount) {
        // Instantiate Azure logout process
        authModule.logout(user.azureUser);
      }
      else {
        handleLogout();
      }
    }
  };


  return (
    <button id="azure-logout-btn" onClick={handleAzureLogout}>
      Log out
    </button>
  );
};
