import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { LogoutButton } from '../../../../azure/auth/Buttons';
import { ContentBody, ContentHeader } from '../../../shared/content';

import Links from './categories/Links';
import Account from './categories/Account';
import Settings from './categories/Settings';
import Dropdown from '../../../shared/dropdown';


const Profile: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <ContentHeader title={t('profile.title')}>
        <Dropdown id="logout" title={t('profile.logout.title')} align="flex-end">
          <LogoutButton/>
          <LogoutButton logoutFromAzure/>
        </Dropdown>
      </ContentHeader>

      <ContentBody>
        <Account/>

        <div className="container-wrapper">
          <Settings/>
          <Links/>
        </div>
      </ContentBody>
    </>
  );
};


export default Profile;
