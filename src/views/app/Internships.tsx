import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../components/shared/content';
import Internships from '../../components/app/categories/internships/Internships';


const InternshipsView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('internships.title')}`;
  }, [t]);


  return (
    <div className="internships-view">
      <ContentHeader>
        <h2>{t('internships.title')}</h2>
      </ContentHeader>

      <Internships/>
    </div>
  );
};


export default InternshipsView;
