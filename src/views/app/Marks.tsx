import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../components/shared/content';
import Marks from '../../components/app/categories/marks/Marks';


const MarksView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('marks.title')}`;
  }, [t]);


  return (
    <div className="marks-view">
      <ContentHeader>
        <h2>{t('marks.title')}</h2>
      </ContentHeader>

      <Marks/>
    </div>
  );
};


export default MarksView;
