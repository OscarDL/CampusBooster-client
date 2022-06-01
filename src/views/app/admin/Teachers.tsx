import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Teachers from '../../../components/app/categories/admin/campus copy';


const TeachersView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('admin.teachers.title')}`;
  }, [t]);


  return (
    <div className="teachers-view">
      <Teachers/>
    </div>
  );
};


export default TeachersView;
