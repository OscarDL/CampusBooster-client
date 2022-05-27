import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';

import { LoginButton } from '../../azure/auth/Buttons';
import { PromptBackdrop, FormPrompt, PromptActions, PromptContent, PromptTitle, PromptWrapper } from '../shared/prompt';

import Unsupported from './Unsupported';


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
        <PromptBackdrop>
          <FormPrompt>
            <PromptWrapper>
              <PromptTitle title={title}/>

              <PromptContent centered>
                <img id="logo" src="/assets/images/logo192.png" alt="logo"/>
                <Divider/>
                <LoginButton/>
              </PromptContent>
            </PromptWrapper>

            <PromptActions column>
              <span id="contact">
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
        </PromptBackdrop>
      );

      default: return <></>;
    }
  };

  return displayLoginPage();
};


export default Login;
