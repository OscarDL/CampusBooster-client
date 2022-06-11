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
              &nbsp;<span>{user.firstName}</span>
            </li>

            <li>
              <p>{t('profile.account.last_name')}</p>
              &nbsp;<span>{user.lastName}</span>
            </li>

            <li>
              <p>{t('profile.account.email')}</p>
              &nbsp;<span
                title={user.email}
                onClick={() => copyEmailToClipboard(user.email)}
                style={{cursor: 'pointer', textDecoration: 'underline'}}
              >
                {user.email}
              </span>
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
            &nbsp;<span>{t('profile.account.gender.' + (user.gender?.toLowerCase() ?? 'none'))}</span>
          </li>

          <li>
            <p>{t('profile.account.birthday')}</p>
            &nbsp;<span>{dayjs(user.birthday).format(t('global.date.mmm-d-yyyy'))}</span>
          </li>

          <li>
            <p>{t('profile.account.address')}</p>
            &nbsp;<span>{user.address}</span>
          </li>

          <li>
            <p>{t('profile.account.personal_email')}</p>
            &nbsp;<span
              title={user.personalEmail}
              onClick={() => copyEmailToClipboard(user.personalEmail)}
              style={{cursor: 'pointer', textDecoration: 'underline'}}
            >
              {user.personalEmail}
            </span>
          </li>

          <li>
            <p>{t('profile.account.campus')}</p>
            &nbsp;<span>{user.Campus?.name ?? t('profile.account.no_campus')}</span>
          </li>

          <li>
            <p>{t('profile.account.promotion')}</p>
            &nbsp;<span>
              {user.UserHasClassrooms?.[0]?.Classroom?.promotion ?? t('profile.account.no_promotion')}
            </span>
          </li>
        </ul>
      </div>
    </Container>
  );
};


export default Account;
