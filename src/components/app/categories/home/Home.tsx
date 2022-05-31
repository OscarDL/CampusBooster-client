import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../../store/store';
import { UserRoles } from '../../../../shared/types/user';
import { getLoggedInAuthState } from '../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../shared/content';

import Credits from './categories/Credits';


const Home: FC = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);


  return (
    <>
      <ContentHeader title={t('home.title')}/>

      <ContentBody>
        {user.role === UserRoles.Student ? <Credits/> : 'Home'}
      </ContentBody>
    </>
  );
};


export default Home;
