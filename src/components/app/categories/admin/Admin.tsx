import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';

import Link from './Link';


const Admin: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('admin.title')}/>

      <ContentBody className="admin-links">
        <Link to="bans" icon="" title="Banned users" details=""/>
        <Link to="campus" icon="" title="Campus list" details=""/>
        <Link to="teachers" icon="" title="Teachers list" details=""/>
        <Link to="plannings" icon="" title="Plannings" details=""/>
        <Link to="classrooms" icon="" title="Classrooms list" details=""/>
      </ContentBody>
    </>
  );
};


export default Admin;
