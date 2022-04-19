import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { LogoutButton } from '../../../../azure/auth/Buttons';
import { getLoggedInAuthState } from '../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../shared/content';

import Account from './categories/Account';
import Settings from './categories/Settings';
import Dropdown from '../../../shared/dropdown';
import Container from '../../../shared/container';

import './Profile.css';


const Profile: FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector(getLoggedInAuthState);


  return (
    <>
      <ContentHeader title={t('profile.title')}>
        <Dropdown id="logout" title={t('profile.logout.title')} align="flex-end">
          <LogoutButton/>
          <LogoutButton logoutFromAzure/>
        </Dropdown>
      </ContentHeader>

      <ContentBody>
        <Account user={user}/>

        <div className="flex flex-col flex-grow">
          <Settings/>

          <Container>
            Category
          </Container>
        </div>
      </ContentBody>
    </>
  );
};


export default Profile;
