import { useTranslation } from 'react-i18next';


function Unsupported() {
  const { t } = useTranslation();

  return (
    <div className="prompt__backdrop">
      <div className="prompt__container">
        <div className="prompt__wrapper">
          <div className="prompt__title">
            <h1>{t('browser.unsupported.title')}</h1>
          </div>

          <div className="prompt__content">
            <p>{t('browser.unsupported.description')}</p>
            <p style={{marginTop:'30px'}}>{t('browser.unsupported.download')}</p>

            <div className="browsers">
              <a href="https://microsoft.com/edge" aria-label={t('browser.new_edge')}>
                <img src="/assets/images/browsers/edge.png" alt="edge" width="100px" height="100px"/>
              </a>
              <a href="https://google.com/chrome" aria-label={t('browser.chrome')}>
                <img src="/assets/images/browsers/chrome.png" alt="chrome" width="100px" height="100px"/>
              </a>
              <a href="https://mozilla.org/firefox" aria-label={t('browser.firefox')}>
                <img src="/assets/images/browsers/firefox.png" alt="firefox" width="100px" height="100px"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Unsupported;
