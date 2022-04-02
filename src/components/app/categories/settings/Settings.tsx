import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { LogoutButton } from '../../../../azure/auth/Buttons';
import { getLoggedInAuthState } from '../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../shared/content';

import Info from './Info';
import Dropdown from '../../../shared/dropdown';

import './Settings.css';
import Container from '../../../shared/container';


const Settings: FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector(getLoggedInAuthState);


  return (
    <>
      <ContentHeader title={t('settings.title')}>
        <Dropdown id="logout" title={t('settings.logout.title')}>
          <LogoutButton/>
          <LogoutButton logoutFromAzure/>
        </Dropdown>
      </ContentHeader>

      <ContentBody>
        <Info user={user}/>

        <div className="flex flex-col flex-grow">
          <Container>
            Category
          </Container>

          <Container>
            Category
          </Container>
        </div>
      </ContentBody>
    </>
  );
};


export default Settings;
