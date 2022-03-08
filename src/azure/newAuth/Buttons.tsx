import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';

import { getLoggedInAuthState } from '../../shared/utils';
import { logout } from '../../store/features/auth/authSlice';


export const LoginButton = () => {
  const { instance } = useMsal();


  const handleAzureLogin = (): void => {
    instance.loginPopup()
      .then((result) => {
        console.log(result);
      })
      .catch(e => {
        console.error(e);
      });
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
    // nothing
  };


  return (
    <button id="azure-logout-btn" onClick={handleAzureLogout}>
      Log out
    </button>
  );
};
