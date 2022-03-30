import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';

import './Summary.css';


const Summary: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('summary.title')}/>

      <ContentBody>
        Summary
      </ContentBody>
    </>
  );
};


export default Summary;
