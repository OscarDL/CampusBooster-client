import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../components/shared/content';
import Summary from '../../components/app/categories/summary/Summary';


const SummaryView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('summary.title')}`;
  }, [t]);


  return (
    <div className="summary-view">
      <ContentHeader>
        <h2>{t('summary.title')}</h2>
      </ContentHeader>

      <Summary/>
    </div>
  );
};


export default SummaryView;
