import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Absences from '../../../components/app/categories/absences';

import './Absences.css';


const AbsencesView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('absences.title')}`;
  }, [t]);


  return (
    <div className="absences-view">
      <Absences/>
    </div>
  );
};


export default AbsencesView;
