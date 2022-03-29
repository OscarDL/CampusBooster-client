import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../components/shared/content';
import Absences from '../../components/app/categories/absences/Absences';


const AbsencesView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('absences.title')}`;
  }, [t]);


  return (
    <div className="absences-view">
      <ContentHeader>
        <h2>{t('absences.title')}</h2>
      </ContentHeader>

      <Absences/>
    </div>
  );
};


export default AbsencesView;
