import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';


const Marks: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('marks.title')}/>

      <ContentBody>
        Marks
      </ContentBody>
    </>
  );
};


export default Marks;
