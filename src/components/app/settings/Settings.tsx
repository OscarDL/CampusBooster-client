import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { LogoutButton } from '../../../azure/auth/Buttons';
import { ContentBody, ContentHeader } from '../../shared/content';

import './Settings.css';


const Settings: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('settings.title')}`;
  }, [t]);


  return (
    <>
      <ContentHeader>
        <h2>{t('settings.title')}</h2>
      </ContentHeader>

      <ContentBody>
        Logout from website: <LogoutButton/><br/>
        Logout from Azure: <LogoutButton logoutFromAzure/>
      </ContentBody>
    </>
  );
};


export default Settings;
