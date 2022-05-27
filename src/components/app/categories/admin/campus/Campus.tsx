import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../../shared/content';


const Campus: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader backButton title={t('admin.campus.title')}/>

      <ContentBody>
        Campus list
      </ContentBody>
    </>
  );
};


export default Campus;
