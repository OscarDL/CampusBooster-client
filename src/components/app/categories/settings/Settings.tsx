import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Dropdown from '../../../shared/dropdown';
import { LogoutButton } from '../../../../azure/auth/Buttons';
import { ContentBody, ContentHeader } from '../../../shared/content';

import './Settings.css';


const Settings: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('settings.title')}>
        <Dropdown id="logout" title={t('settings.logout.title')}>
          <LogoutButton/>
          <LogoutButton logoutFromAzure/>
        </Dropdown>
      </ContentHeader>

      <ContentBody>
        Settings
      </ContentBody>
    </>
  );
};


export default Settings;
