import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../components/shared/content';
import Admin from '../../components/app/categories/admin/Admin';


const AdminView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('admin.title')}`;
  }, [t]);


  return (
    <div className="admin-view">
      <ContentHeader>
        <h2>{t('admin.title')}</h2>
      </ContentHeader>

      <Admin/>
    </div>
  );
};


export default AdminView;
