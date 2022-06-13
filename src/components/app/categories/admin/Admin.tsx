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
        <Link
          to="campus"
          icon={t('admin.campus.icon')}
          title={t('admin.campus.title')}
          details={t('admin.campus.details')}
        />
        <Link
          to="classrooms"
          icon={t('admin.classrooms.icon')}
          title={t('admin.classrooms.title')}
          details={t('admin.classrooms.details')}
        />
        <Link
          to="plannings"
          icon={t('admin.plannings.icon')}
          title={t('admin.plannings.title')}
          details={t('admin.plannings.details')}
        />
        <Link
          to="teachers"
          icon={t('admin.teachers.icon')}
          title={t('admin.teachers.title')}
          details={t('admin.teachers.details')}
        />
        <Link
          to="bans"
          icon={t('admin.banned_users.icon')}
          title={t('admin.banned_users.title')}
          details={t('admin.banned_users.details', {brand: t('brand')})}
        />
      </ContentBody>
    </>
  );
};


export default Admin;
