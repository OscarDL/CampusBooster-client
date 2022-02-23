import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './Settings.css';


function Settings() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('settings.page');
  }, [t]);


  return (
    <div className="settings">
      Settigns page
    </div>
  );
};


export default Settings;
