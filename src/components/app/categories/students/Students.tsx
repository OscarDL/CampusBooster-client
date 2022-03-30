import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';


const Students: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('students.title')}/>

      <ContentBody>
        Students
      </ContentBody>
    </>
  );
};


export default Students;
