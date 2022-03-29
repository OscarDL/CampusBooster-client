import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../components/shared/content';
import Students from '../../components/app/categories/students/Students';


const StudentsView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('students.title')}`;
  }, [t]);


  return (
    <div className="students-view">
      <ContentHeader>
        <h2>{t('students.title')}</h2>
      </ContentHeader>

      <Students/>
    </div>
  );
};


export default StudentsView;
