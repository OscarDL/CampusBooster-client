import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Unsupported from './Unsupported';
import { AzureData } from '../../shared/types/user';
import { LoginButton } from '../../azure/auth/Buttons';
import { login } from '../../store/features/auth/authSlice';

import './Auth.css';


function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [unsupported, setUnsupported] = useState<boolean>();


  const handleLogin = async (azureData: AzureData) => {
    dispatch(login(azureData));
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
        <div className="loader">
          <LoginButton handleLogin={handleLogin}/>
        </div>
      );

      default: return <></>;
    }
  };

  return displayLoginPage();
};


export default Login;
