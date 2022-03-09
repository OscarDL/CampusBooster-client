import { toast } from 'react-toastify';
import { useMsal } from '@azure/msal-react';
import { useTranslation } from 'react-i18next';


export const LoginButton = ({handleLogin}: any) => {
  const { t } = useTranslation();
  const { instance } = useMsal();


  const handleAzureLogin = (): void => {
    instance.loginPopup()
      .then((azureData) => {
        handleLogin(azureData);
      })
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


export const LogoutButton = ({handleLogout, logoutFromAzure = false}: any) => {
  const { instance } = useMsal();


  const handleAzureLogout = (): any => {
    if (logoutFromAzure) {
      instance.logoutPopup()
        .then(() => {
          handleLogout(true);
        })
        .catch(e => {
          console.error(e);
          toast.error('logout.errors.error');
        });
    }

    else {
      handleLogout(false);
    }
  };


  return (
    <button id="azure-logout-btn" onClick={handleAzureLogout}>
      Log out
    </button>
  );
};
