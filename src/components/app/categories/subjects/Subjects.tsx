import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';


const Subjects: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('subjects.title')}/>

      <ContentBody>
        Subjects
      </ContentBody>
    </>
  );
};


export default Subjects;
