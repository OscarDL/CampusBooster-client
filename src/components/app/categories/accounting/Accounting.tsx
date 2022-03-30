import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';


const Accounting: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('accounting.title')}/>

      <ContentBody>
        Accounting
      </ContentBody>
    </>
  );
};


export default Accounting;
