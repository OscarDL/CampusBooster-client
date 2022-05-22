import dayjs from 'dayjs';
import { FC } from 'react';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { User } from '../../../../../shared/types/user';
import { ContentHeader } from '../../../../shared/content';

import Container from '../../../../shared/container';


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
          <img src={user.avatar ?? `https://avatars.dicebear.com/api/avataaars/${user.azureData.localAccountId}.svg`} alt="avatar"/>
          <ul>
            <li>
              <p>{t('profile.account.first_name')}</p>
              <span>&nbsp;{user.firstName}</span>
            </li>

            <li>
              <p>{t('profile.account.last_name')}</p>
              <span>&nbsp;{user.lastName}</span>
            </li>

            <li>
              <p>{t('profile.account.email')}</p>
              <span title={user.email}>&nbsp;{user.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <Divider/>

      <div className="profile__more-info">
        <ContentHeader title={t('profile.account.title_more')}/>
        <ul>
          <li>
            <p>{t('profile.account.birthday')}</p>
            <span>&nbsp;{dayjs(user.birthday).format(t('global.date-mmm-d-yyyy'))}</span>
          </li>

          <li>
            <p>{t('profile.account.campus')}</p>
            <span>&nbsp;{user.Campus?.name ?? t('profile.account.no_campus')}</span>
          </li>

          <li>
            <p>{t('profile.account.promotion')}</p>
            <span>&nbsp;
              {user.UserHasClassrooms?.[0]?.Classroom?.promotion ? (
                t('profile.account.promotion_text', {count: user.UserHasClassrooms?.[0]?.Classroom?.promotion})
              ) : (
                t('profile.account.no_promotion')
              )}
            </span>
          </li>
        </ul>
      </div>
    </Container>
  );
};


export default Account;
