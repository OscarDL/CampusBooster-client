import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Classrooms from '../../../components/app/categories/admin/classrooms';


const ClassroomsView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('admin.classrooms.title')}`;
  }, [t]);


  return (
    <div className="classrooms-view">
      <Classrooms/>
    </div>
  );
};


export default ClassroomsView;
