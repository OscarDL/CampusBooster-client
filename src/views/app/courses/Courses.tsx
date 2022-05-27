import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Courses from '../../../components/app/categories/courses';

import './Courses.css';


const CoursesView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('courses.title')}`;
  }, [t]);


  return (
    <div className="courses-view">
      <Courses/>
    </div>
  );
};


export default CoursesView;
