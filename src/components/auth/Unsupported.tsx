import { useTranslation } from 'react-i18next';


function Unsupported() {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <h1>{t('browser.unsupported.title')}</h1>
      </div>

      <div>
        <p>{t('browser.unsupported.description')}</p>
        <p style={{marginTop:'30px'}}>{t('browser.unsupported.download')}</p>

        <div>
          <a href="https://microsoft.com/edge" aria-label={t('browser.new_edge')}>
            <img src="/assets/images/edge.png" alt="edge" width="100px" height="100px"/>
          </a>
          <a href="https://google.com/chrome" aria-label={t('browser.chrome')}>
            <img src="/assets/images/chrome.png" alt="chrome" width="100px" height="100px"/>
          </a>
          <a href="https://mozilla.org/firefox" aria-label={t('browser.firefox')}>
            <img src="/assets/images/firefox.png" alt="firefox" width="100px" height="100px"/>
          </a>
        </div>
      </div>
    </div>
  );
};


export default Unsupported;
