import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';


const Admin: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('admin.title')}/>

      <ContentBody>
        Admin : user ban list, manage planning for each class, etc
      </ContentBody>
    </>
  );
};


export default Admin;
