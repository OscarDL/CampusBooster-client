import { t } from 'i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useMsal } from '@azure/msal-react';

import { logout } from '../../store/features/auth/authSlice';
import { clearAzureLocalStorageData } from '../../shared/utils';


export const LoginButton = () => {
  const { instance } = useMsal();


  const handleAzureLogin = () => {
    instance.loginRedirect()
      .catch(e => {
        console.error(e);
        toast.error(t('login.errors.error'));
      });
  };


  return (
    <button id="azure-login-btn" onClick={handleAzureLogin}>
      Log in
    </button>
  );
};


export const LogoutButton = ({logoutFromAzure = false}: any) => {
  const dispatch = useDispatch();
  const { instance, accounts: [azureData] } = useMsal();


  const handleAzureLogout = () => {
    if (logoutFromAzure) {
      localStorage.removeItem('loggedIn');

      instance.logoutRedirect()
        .catch(e => {
          console.error(e);
          toast.error('login.errors.logout');
        });
    }
  
    else {
      dispatch(logout());
      clearAzureLocalStorageData(azureData);
    }
  };


  return (
    <button id="azure-logout-btn" onClick={handleAzureLogout}>
      Log out
    </button>
  );
};
