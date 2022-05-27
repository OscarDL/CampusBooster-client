import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';


const Admin: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('admin.title')}/>

      <ContentBody>
        Admin : banned users list, classroom list + course access, manage planning for each class, etc
        <br/><Link to="bans">Banned users list</Link>
        <br/><Link to="campus">Campus list</Link>
        <br/><Link to="classrooms">Classrooms list</Link>
      </ContentBody>
    </>
  );
};


export default Admin;
