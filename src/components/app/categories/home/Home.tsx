import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { UserRoles } from '../../../../shared/types/user';
import { getSummary } from '../../../../store/features/home/slice';
import { getLoggedInAuthState } from '../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

import Grades from './categories/Grades';
import TopRow from './categories/TopRow';
import Credits from './categories/Credits';
import Loader from '../../../shared/loader';
import Planning from './categories/Planning';


const Home: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { summary } = useAppSelector(state => state.home);

  const showCreditsPane = user.role === UserRoles.Student;


  useEffect(() => {
    if (!summary) dispatch(getSummary());
  }, [summary, dispatch]);


  return (
    <>
      <ContentHeader title={t('brand')}/>

      <ContentBody>
        {summary ? (
          <>
            <div className="banner">
              <div className="banner__background"/>

              <div className="banner__content">
                <div className="banner__logo">
                  <img src="/assets/images/banner/logo.png" alt="logo" style={{height: '100%', borderRadius: 'var(--radius-medium) 0 0 var(--radius-medium)'}}/>
                </div>
                <h1 className="banner__text">{t('home.banner')}</h1>
              </div>
            </div>

            <TopRow summary={summary}/>

            <div className={'bottom-grid' + (showCreditsPane ? '' : ' no-credits')}>
              {showCreditsPane ? <Credits summary={summary}/> : null}

              <div className="planning-grades">
                <Planning summary={summary}/>
                <Grades summary={summary}/>
              </div>
            </div>
          </>
        ) : (
          <Loader fullSize/>
        )}
      </ContentBody>
    </>
  );
};


export default Home;
