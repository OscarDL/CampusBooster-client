import { FC } from 'react';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { User } from '../../../../shared/types/user';
import { ContentHeader } from '../../../shared/content';

import Container from '../../../shared/container';

import './Settings.css';


type Props = {
  user: User
};


const Settings: FC<Props> = ({user}) => {
  const { t } = useTranslation();


  return (
    <Container className="profile">
      <div className="profile__main-info">
        <ContentHeader title={t('settings.info.title')}/>

        <div className="flex">
          <img src={`https://avatars.dicebear.com/api/avataaars/${user.azureData.localAccountId}.svg`} alt="avatar"/>
          <ul>
            <li>
              <p>{t('settings.info.first_name')}</p>
              <span title={user.firstName}>{user.firstName}</span>
            </li>

            <li>
              <p>{t('settings.info.last_name')}</p>
              <span title={user.lastName}>{user.lastName}</span>
            </li>

            <li>
              <p>{t('settings.info.email')}</p>
              <span title={user.email}>{user.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <Divider/>

      <div className="profile__more-info">
        <ContentHeader title={t('settings.info.title_more')}/>
        <ul>
          <li>
            {t('settings.info.birthday')}&nbsp;
            <span style={{fontWeight: 'bolder'}}>{user.birthday}</span>
          </li>

          <li>
            {t('settings.info.campus')}&nbsp;
            <span style={{fontWeight: 'bolder'}}>{user.campus}</span>
          </li>

          <li>
            {t('settings.info.school_year')}&nbsp;
            <span style={{fontWeight: 'bolder'}}>{user.schoolYear}</span>
          </li>
        </ul>
      </div>
    </Container>
  );
};


export default Settings;
