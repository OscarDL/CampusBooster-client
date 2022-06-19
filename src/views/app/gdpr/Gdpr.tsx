import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Gdpr from '../../../components/app/categories/gdpr';

import './Gdpr.css';


const GdprView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('gdpr.title')}`;
  }, [t]);


  return (
    <div className="gdpr-view">
      <Gdpr/>
    </div>
  );
};


export default GdprView;
