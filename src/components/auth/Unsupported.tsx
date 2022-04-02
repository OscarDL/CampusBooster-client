import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Backdrop, DivPrompt, PromptContent, PromptTitle, PromptWrapper } from '../shared/prompt';


const Unsupported: FC = () => {
  const { t } = useTranslation();

  return (
    <Backdrop className="unsupported">
      <DivPrompt>
        <PromptWrapper>
          <PromptTitle>
            <h1>{t('browser.unsupported.title')}</h1>
          </PromptTitle>

          <PromptContent centered>
            <p>{t('browser.unsupported.description')}</p>

            <p>{t('browser.unsupported.download')}</p>

            <div className="browsers">
              <a href="https://microsoft.com/edge" aria-label={t('browser.edge')}>
                <img src="/assets/images/browsers/edge.png" alt="edge" width="100px" height="100px"/>
              </a>
              <a href="https://google.com/chrome" aria-label={t('browser.chrome')}>
                <img src="/assets/images/browsers/chrome.png" alt="chrome" width="100px" height="100px"/>
              </a>
              <a href="https://mozilla.org/firefox" aria-label={t('browser.firefox')}>
                <img src="/assets/images/browsers/firefox.png" alt="firefox" width="100px" height="100px"/>
              </a>
            </div>
          </PromptContent>
        </PromptWrapper>
      </DivPrompt>
    </Backdrop>
  );
};


export default Unsupported;
