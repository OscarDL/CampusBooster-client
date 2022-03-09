import { toast } from 'react-toastify';
import { useMsal } from '@azure/msal-react';


export const LoginButton = ({handleLogin}: any) => {
  const { instance } = useMsal();


  const handleAzureLogin = (): void => {
    instance.loginPopup()
      .then((azureData) => {
        handleLogin(azureData);
      })
      .catch(e => {
        console.error(e);
        toast.error('login.error');
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
          toast.error('logout.error');
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
