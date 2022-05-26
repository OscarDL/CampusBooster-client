import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../../shared/content';


const Classrooms: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader backButton title={t('admin.classrooms.title')}/>

      <ContentBody>
        Classroom list + course access
      </ContentBody>
    </>
  );
};


export default Classrooms;
