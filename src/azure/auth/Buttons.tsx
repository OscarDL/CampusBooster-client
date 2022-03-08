import { useDispatch, useSelector } from 'react-redux';

import AzureAuthContext from './context';
import { getLoggedInAuthState } from '../../shared/utils';
import { logout } from '../../store/features/auth/authSlice';


const authModule = new AzureAuthContext();


export const LoginButton = ({ handleLogin }: any): JSX.Element => {
  const handleAzureLogin = (): any => {
    // Instantiate Azure login process
    authModule.login(handleLogin);
  };


  return (
    <button id="azure-login-btn" onClick={handleAzureLogin}>
      Log in
    </button>
  );
};


export const LogoutButton = ({ logoutFromMsAccount = false }: any) => {
  const dispatch = useDispatch();
  const {user} = useSelector(getLoggedInAuthState);


  const handleAzureLogout = (): any => {
    if (user) {
      localStorage.removeItem('isLoggedIn');

      // Mitigate login error after logging out
      sessionStorage.removeItem('msal.interaction.status');

      if (logoutFromMsAccount) {
        // Instantiate Azure logout process
        authModule.logout(user.azureUser).then(() => {
          alert('Logged out of MS account');
          dispatch(logout(true));
        });
      }
      else {
        // Only log the user out of the website
        alert('Logged out of website');
        dispatch(logout(false));
      }
    }
  };


  return (
    <button id="azure-logout-btn" onClick={handleAzureLogout}>
      Log out
    </button>
  );
};
