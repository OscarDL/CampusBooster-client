import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { getSummary } from '../../../../store/features/home/slice';
import { getLoggedInAuthState } from '../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

import Credits from './categories/Credits';


const Home: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { summary } = useAppSelector(state => state.home);


  useEffect(() => {
    if (!summary) dispatch(getSummary());
  }, [summary, dispatch]);


  return (
    <>
      <ContentHeader title={t('home.title')}/>

      <ContentBody>
        <div id="grid">
          {/* {user.role === UserRoles.Student ? <Credits/> : 'Home'} */}
          <Credits/>
        </div>
      </ContentBody>
    </>
  );
};


export default Home;
