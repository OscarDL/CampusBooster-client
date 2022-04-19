import { FC } from 'react';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMsal } from '@azure/msal-react';

import { loginRequest } from './config';
import { logout } from '../../store/features/auth/slice';
import { clearAzureLocalStorageData } from '../../shared/functions';

import './Buttons.css';


export const LoginButton: FC = () => {
  const { instance } = useMsal();

  const handleAzureLogin = () => {
    instance.loginRedirect(loginRequest)
      .catch(e => {
        console.error(e);
        toast.error(t('login.errors.error'));
      });
  };

  return (
    <Button variant="contained" className="login-btn" onClick={handleAzureLogin}>
      <span>
        <img src="/assets/images/microsoft.svg" alt="microsoft"/>
        {t('login.microsoft')}
      </span>
    </Button>
  );
};


type LogoutProps = {
  logoutFromAzure?: boolean
};

export const LogoutButton: FC<LogoutProps> = ({logoutFromAzure}) => {
  const dispatch = useDispatch();
  const { instance, accounts: [azureData] } = useMsal();

  const handleAzureLogout = () => {
    if (logoutFromAzure) {
      instance.logoutRedirect()
        .catch(e => {
          console.error(e);
          toast.error(t('login.errors.logout'));
        });
    }
  
    else {
      dispatch(logout());
      clearAzureLocalStorageData(azureData);
    }
  };

  return (
    <Button variant="text" onClick={handleAzureLogout}>
      <span>{t('profile.logout.' + (logoutFromAzure ? 'microsoft' : 'website'))}</span>
      {logoutFromAzure && (
        <span className="material-icons-round">launch</span>
      )}
    </Button>
  );
};
