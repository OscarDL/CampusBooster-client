import dayjs from 'dayjs';
import { FC } from 'react';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { User } from '../../../../../shared/types/user';
import { ContentHeader } from '../../../../shared/content';

import Container from '../../../../shared/container';
import { toast } from 'react-toastify';


type Props = {
  user: User
};


const Account: FC<Props> = ({user}) => {
  const { t } = useTranslation();

  const copyEmailToClipboard = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      toast.info(t('profile.account.email_copy.success'));
    }
    catch (error) {
      toast.error(t('profile.account.email_copy.error'));
    }
  };


  return (
    <Container className="profile">
      <div className="profile__main-info">
        <ContentHeader title={t('profile.account.title')}/>

        <div className="flex">
          <img src={user.avatar ?? `https://avatars.dicebear.com/api/avataaars/${user.azureData.localAccountId}.svg`} alt="avatar"/>
          <ul>
            <li>
              <p>{t('profile.account.first_name')}</p>
              &nbsp;<p>{user.firstName}</p>
            </li>

            <li>
              <p>{t('profile.account.last_name')}</p>
              &nbsp;<p>{user.lastName}</p>
            </li>

            <li>
              <p>{t('profile.account.email')}</p>
              &nbsp;<p
                title={user.email}
                onClick={() => copyEmailToClipboard(user.email)}
                style={{cursor: 'pointer', textDecoration: 'underline'}}
              >
                {user.email}
              </p>
            </li>
          </ul>
        </div>
      </div>

      <Divider/>

      <div className="profile__more-info">
        <ContentHeader title={t('profile.account.title_more')}/>
        <ul>
          <li>
            <p>{t('profile.account.gender.title')}</p>
            &nbsp;<p>{t('profile.account.gender.' + (user.gender?.toLowerCase() ?? 'none'))}</p>
          </li>

          <li>
            <p>{t('profile.account.birthday')}</p>
            &nbsp;<p>{dayjs(user.birthday).format(t('global.date.mmm-d-yyyy'))}</p>
          </li>

          <li>
            <p>{t('profile.account.address')}</p>
            &nbsp;<p>{user.address}</p>
          </li>

          <li>
            <p>{t('profile.account.personal_email')}</p>
            &nbsp;<p
              title={user.personalEmail}
              onClick={() => copyEmailToClipboard(user.personalEmail)}
              style={{cursor: 'pointer', textDecoration: 'underline'}}
            >
              {user.personalEmail}
            </p>
          </li>

          <li>
            <p>{t('profile.account.campus')}</p>
            &nbsp;<p>{user.Campus?.name ?? t('profile.account.no_campus')}</p>
          </li>

          <li>
            <p>{t('profile.account.promotion')}</p>
            &nbsp;<p>
              {user.UserHasClassrooms?.[0]?.Classroom?.promotion ?? t('profile.account.no_promotion')}
            </p>
          </li>
        </ul>
      </div>
    </Container>
  );
};


export default Account;
