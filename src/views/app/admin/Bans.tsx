import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Bans from '../../../components/app/categories/admin/bans';


const BannedUsersView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('admin.banned_users.title')}`;
  }, [t]);


  return (
    <div className="banned-users-view">
      <Bans/>
    </div>
  );
};


export default BannedUsersView;
