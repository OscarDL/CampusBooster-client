import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Unsupported from './Unsupported';
import { LoginButton } from '../../azure/auth/Buttons';

import './Auth.css';


function Login() {
  const { t } = useTranslation();

  const [unsupported, setUnsupported] = useState<boolean>();


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
          <LoginButton/>
        </div>
      );

      default: return <></>;
    }
  };

  return displayLoginPage();
};


export default Login;
