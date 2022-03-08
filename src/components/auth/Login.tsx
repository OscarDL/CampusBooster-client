import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Unsupported from './Unsupported';
import { AzureUser } from '../../shared/types/user';
import { login, logout } from '../../store/features/auth/authSlice';
import { LoginButton, LogoutButton } from '../../azure/auth/Buttons';

import './Auth.css';


function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);
  const [unsupported, setUnsupported] = useState<boolean>();


  const handleLogin = async (azureUser: AzureUser) => {
    dispatch(login(azureUser));
  };

  const handleLogout = async () => {
    dispatch(logout(false));
  };


  useEffect(() => {
    document.title = `${t('brand')} - ${t('login.title')}`;

    import('detect-browser').then(({detect}) => {
      setUnsupported(['edge', 'ie'].includes(detect()?.name ?? 'ie'));
    });
  }, [t]);


  const displayLoginPage = (): JSX.Element => {
    switch (unsupported) {
      case true: return <Unsupported/>;

      case false: return (
        user?.id ? (
          <LogoutButton user={user} handleLogout={handleLogout}/>
        ) : (
          <LoginButton handleLogin={handleLogin}/>
        )
      );

      default: return <></>;
    }
  };


  return displayLoginPage();
};


export default Login;
