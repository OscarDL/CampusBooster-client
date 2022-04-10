import { FC } from 'react';
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
      <div className="flex">
        <img src={`https://avatars.dicebear.com/api/avataaars/${user.azureData.localAccountId}.svg`} alt="Avatar"/>

        <div>
          <ContentHeader title={t('settings.info.title')}/>
          <ul>
            <li>
              {t('settings.info.first_name')}&nbsp;
              <span style={{fontWeight: 'bolder'}}>{user.firstName}</span>
            </li>

            <li>
              {t('settings.info.last_name')}&nbsp;
              <span style={{fontWeight: 'bolder'}}>{user.lastName}</span>
            </li>

            <li>
              {t('settings.info.email')}&nbsp;
              <span style={{fontWeight: 'bolder'}}>{user.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div>
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
