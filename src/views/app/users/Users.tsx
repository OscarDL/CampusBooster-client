import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Users from '../../../components/app/categories/users';

import './Users.css';


const UsersView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('users.title')}`;
  }, [t]);


  return (
    <div className="users-view">
      <Users/>
    </div>
  );
};


export default UsersView;
