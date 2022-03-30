import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Students from '../../components/app/categories/students/Students';


const StudentsView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('students.title')}`;
  }, [t]);


  return (
    <div className="students-view">
      <Students/>
    </div>
  );
};


export default StudentsView;
