import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Unsupported from './Unsupported';
import { AzureUser } from '../../shared/types/user';
import { LoginButton } from '../../azure/newAuth/Buttons';
import { login } from '../../store/features/auth/authSlice';

import './Auth.css';


function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [unsupported, setUnsupported] = useState<boolean>();


  const handleLogin = async (azureUser: AzureUser) => {
    dispatch(login(azureUser));
  };

  const displayLoginPage = (): JSX.Element => {
    switch (unsupported) {
      case true: return <Unsupported/>;

      case false: return (
        <div className="loader">
          <LoginButton/>
        </div>
      );

      default: return <></>;
    }
  };


  useEffect(() => {
    document.title = `${t('brand')} - ${t('login.title')}`;

    import('detect-browser').then(({detect}) => {
      setUnsupported(['edge', 'ie'].includes(detect()?.name ?? 'ie'));
    });
  }, [t]);


  return displayLoginPage();
};


export default Login;
