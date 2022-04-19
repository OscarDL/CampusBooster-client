import dayjs from 'dayjs';
import { FC } from 'react';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { User } from '../../../../shared/types/user';
import { ContentHeader } from '../../../shared/content';

import Container from '../../../shared/container';


type Props = {
  user: User
};


const Account: FC<Props> = ({user}) => {
  const { t } = useTranslation();


  return (
    <Container className="profile">
      <div className="profile__main-info">
        <ContentHeader title={t('profile.account.title')}/>

        <div className="flex">
          <img src={`https://avatars.dicebear.com/api/avataaars/${user.azureData.localAccountId}.svg`} alt="avatar"/>
          <ul>
            <li>
              <p>{t('profile.account.first_name')}</p>
              <span title={user.firstName}>{user.firstName}</span>
            </li>

            <li>
              <p>{t('profile.account.last_name')}</p>
              <span title={user.lastName}>{user.lastName}</span>
            </li>

            <li>
              <p>{t('profile.account.email')}</p>
              <span title={user.email}>{user.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <Divider/>

      <div className="profile__more-info">
        <ContentHeader title={t('profile.account.title_more')}/>
        <ul>
          <li>
            {t('profile.account.birthday')}&nbsp;
            <span style={{fontWeight: 'bolder'}}>{dayjs(user.birthday).format(t('dayjs-format'))}</span>
          </li>

          <li>
            {t('profile.account.campus')}&nbsp;
            <span style={{fontWeight: 'bolder'}}>{user.campus}</span>
          </li>

          <li>
            {t('profile.account.school_year')}&nbsp;
            <span style={{fontWeight: 'bolder'}}>{user.schoolYear}</span>
          </li>
        </ul>
      </div>
    </Container>
  );
};


export default Account;
