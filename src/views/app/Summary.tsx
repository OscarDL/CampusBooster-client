import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Summary from '../../components/app/categories/summary/Summary';


const SummaryView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('summary.title')}`;
  }, [t]);


  return (
    <div className="summary-view">
      <Summary/>
    </div>
  );
};


export default SummaryView;
