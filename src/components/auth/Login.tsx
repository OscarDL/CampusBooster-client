import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Unsupported from './Unsupported';
import { fakeUserData } from '../../shared/utils';
import { useAppContext } from '../../context/app/Provider';

import './Auth.css';


function Login() {
  const { t } = useTranslation();
  const [, appDispatch] = useAppContext();
  const [supported, setSupported] = useState<boolean | null>(null);


  const handleLogin = () => {
    appDispatch({ user: fakeUserData });
    toast(t('login.success'), { type: 'success' });
  };

  useEffect(() => {
    document.title = t('login.page');

    import('detect-browser').then(({detect}) => {
      setSupported(!['edge', 'ie'].includes(detect()?.name ?? 'ie'));
    });
  }, [t]);


  return (
    <>
      <button onClick={handleLogin}>
        Click to login with fake user data
      </button>

      {supported === false && (
        <Unsupported/>
      )}
    </>
  );
};


export default Login;
