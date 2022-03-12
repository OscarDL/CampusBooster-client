import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { LogoutButton } from '../../../azure/auth/Buttons';

import './Settings.css';


function Settings() {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('settings.title')}`;
  }, [t]);


  return (
    <div className="settings">
      <p>Settings page</p>
      Logout from website: <LogoutButton/><br/>
      Logout from Azure: <LogoutButton logoutFromAzure/>
    </div>
  );
};


export default Settings;
