import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Profile from '../../../components/app/categories/profile';

import './Profile.css';


const ProfileView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('profile.title')}`;
  }, [t]);


  return (
    <div className="profile-view">
      <Profile/>
    </div>
  );
};


export default ProfileView;
