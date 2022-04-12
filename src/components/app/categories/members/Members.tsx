import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';


const Members: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('members.title')}/>

      <ContentBody>
        Members
      </ContentBody>
    </>
  );
};


export default Members;
