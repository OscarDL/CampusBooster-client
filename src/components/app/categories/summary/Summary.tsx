import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './Summary.css';


function Summary() {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('summary.title')}`;
  }, [t]);


  return (
    <div className="summary">
      <p>Summary</p>
    </div>
  );
};


export default Summary;
