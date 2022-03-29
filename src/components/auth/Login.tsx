import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Unsupported from './Unsupported';
import { LoginButton } from '../../azure/auth/Buttons';
import { Backdrop, FormPrompt, PromptActions, PromptContent, PromptTitle, PromptWrapper } from '../shared/prompt';

import './Auth.css';
import { Divider } from '@mui/material';


const Login: FC = () => {
  const { t } = useTranslation();
  const [unsupported, setUnsupported] = useState<boolean>();

  const title = `${t('brand')} \u2013 ${t('login.title')}`;


  useEffect(() => {
    document.title = title;

    import('detect-browser').then(({detect}) => {
      setUnsupported(['edge', 'ie'].includes(detect()?.name ?? 'ie'));
    });
  }, [title]);


  const displayLoginPage = (): JSX.Element => {
    switch (unsupported) {
      case true: return <Unsupported/>;

      case false: return (
        <Backdrop>
          <FormPrompt>
            <PromptWrapper>
              <PromptTitle>
                <h1>{title}</h1>
              </PromptTitle>

              <PromptContent centered>
                <img className="login-logo" src="/assets/images/logo192.png" alt="logo"/>
                <Divider/>
                <LoginButton/>
              </PromptContent>
            </PromptWrapper>

            <PromptActions column>
              <span style={{margin: '0 auto'}}>
                {t('login.need_help')}&nbsp;
                <a
                  target="_blank" rel="noreferrer"
                  href="https://www.supinfo.com/contact"
                >
                  {t('login.contact_us')}
                </a>.
              </span>
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
