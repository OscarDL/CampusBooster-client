import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../components/shared/content';
import Subjects from '../../components/app/categories/subjects/Subjects';


const SubjectsView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('subjects.title')}`;
  }, [t]);


  return (
    <div className="subjects-view">
      <ContentHeader>
        <h2>{t('subjects.title')}</h2>
      </ContentHeader>

      <Subjects/>
    </div>
  );
};


export default SubjectsView;
