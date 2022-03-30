import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';


const Absences: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('absences.title')}/>

      <ContentBody>
        Absences
      </ContentBody>
    </>
  );
};


export default Absences;
