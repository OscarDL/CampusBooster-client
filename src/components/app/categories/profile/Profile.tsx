import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../../store/store';
import { UserRoles } from '../../../../shared/types/user';
import { LogoutButton } from '../../../../azure/auth/Buttons';
import { getLoggedInAuthState } from '../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../shared/content';

import Links from './categories/Links';
import Credits from './categories/Credits';
import Account from './categories/Account';
import Settings from './categories/Settings';
import Dropdown from '../../../shared/dropdown';


const Profile: FC = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);


  return (
    <>
      <ContentHeader title={t('profile.title')}>
        <Dropdown id="logout" title={t('profile.logout.title')} align="flex-end">
          <LogoutButton/>
          <LogoutButton logoutFromAzure/>
        </Dropdown>
      </ContentHeader>

      <ContentBody>
        {user.role === UserRoles.Student ? (
          <div className="container-wrapper">
            <Account user={user}/>
            <Credits/>
          </div>
        ) : (
          <Account user={user}/>
        )}

        <div className="container-wrapper">
          <Settings/>
          <Links/>
        </div>
      </ContentBody>
    </>
  );
};


export default Profile;
