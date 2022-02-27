import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Unsupported from './Unsupported';
import { fakeUserLogin } from '../../shared/utils';
import { login } from '../../store/features/auth/authSlice';

import './Auth.css';


function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [unsupported, setUnsupported] = useState<boolean | null>(null);


  const handleLogin = () => {
    dispatch(login(fakeUserLogin));
  };

  useEffect(() => {
    document.title = `${t('brand')} - ${t('login.title')}`;

    import('detect-browser').then(({detect}) => {
      setUnsupported(['edge', 'ie'].includes(detect()?.name ?? 'ie'));
    });
  }, [t]);


  return (
    <>
      <button onClick={handleLogin}>
        Click to login with fake user data
      </button>

      {unsupported && <Unsupported/>}
    </>
  );
};


export default Login;
