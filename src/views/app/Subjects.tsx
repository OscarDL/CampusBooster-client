import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Subjects from '../../components/app/categories/subjects/Subjects';


const SubjectsView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('subjects.title')}`;
  }, [t]);


  return (
    <div className="subjects-view">
      <Subjects/>
    </div>
  );
};


export default SubjectsView;
