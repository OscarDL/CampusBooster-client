import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';


const Internships: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('internships.title')}/>

      <ContentBody>
        Internships
      </ContentBody>
    </>
  );
};


export default Internships;
