import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';


const Tools: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('tools.title')}/>

      <ContentBody>
        Tools
      </ContentBody>
    </>
  );
};


export default Tools;
