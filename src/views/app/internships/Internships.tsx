import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Internships from '../../../components/app/categories/internships';

import './Internships.css';


const InternshipsView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('internships.title')}`;
  }, [t]);


  return (
    <div className="internships-view">
      <Internships/>
    </div>
  );
};


export default InternshipsView;
