import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Admin from '../../../components/app/categories/admin';

import './Admin.css';


const AdminView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('admin.title')}`;
  }, [t]);


  return (
    <div className="admin-view">
      <Admin/>
    </div>
  );
};


export default AdminView;
