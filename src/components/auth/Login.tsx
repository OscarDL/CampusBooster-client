import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Unsupported from './Unsupported';
import { LoginButton } from '../../azure/auth/Buttons';
import { Backdrop, FormPrompt, PromptActions, PromptContent, PromptTitle, PromptWrapper } from '../shared/prompt';

import './Auth.css';


const Login: FC = () => {
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
        <Backdrop>
          <FormPrompt>
            <PromptWrapper>
              <PromptTitle>
                <h1>{t('brand')} {'\u2013'} {t('login.title')}</h1>
              </PromptTitle>

              <PromptContent centered>
                <LoginButton/>
              </PromptContent>
            </PromptWrapper>

            <PromptActions>
              <button>test</button>
              <button>test</button>
            </PromptActions>
          </FormPrompt>
        </Backdrop>
      );

      default: return <></>;
    }
  };

  return displayLoginPage();
};


export default Login;
