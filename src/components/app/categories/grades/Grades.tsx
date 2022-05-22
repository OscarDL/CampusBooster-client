import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';


const Grades: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('grades.title')}/>

      <ContentBody>
        Grades
      </ContentBody>
    </>
  );
};


export default Grades;
