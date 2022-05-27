import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Grades from '../../../components/app/categories/grades';

import './Grades.css';


const GradesView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('grades.title')}`;
  }, [t]);


  return (
    <div className="grades-view">
      <Grades/>
    </div>
  );
};


export default GradesView;
