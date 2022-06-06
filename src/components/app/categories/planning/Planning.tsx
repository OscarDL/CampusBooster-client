import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';

import { getLoggedInAuthState } from '../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { getUserProjects } from '../../../../store/features/projects/slice';
import { getUserPlanning } from '../../../../store/features/plannings/slice';

import Loader from '../../../shared/loader';
import Calendar from './categories/Calendar';
import DetailsList from './categories/details/List';
import ProjectsList from './categories/projects/List';


const Planning: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { projectsList } = useAppSelector(state => state.projects);
  const { planningsList } = useAppSelector(state => state.plannings);

  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());


  useEffect(() => {
    const initData = async () => {
      if (!projectsList) await dispatch(getUserProjects(user.id));

      if (!planningsList) await dispatch(getUserPlanning(user.id));
    };

    // Do NOT include useEffect dependencies from initData() prior to user planning
    // to avoid calling the API with other dispatch calls multiple times unnecessarily.
    initData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planningsList, user.id, user.role, dispatch]);


  return (
    <>
      <ContentHeader title={t('planning.title')}/>

      <ContentBody>
        {(planningsList && projectsList) ? (
          <>
            <Calendar date={date} setDate={setDate}/>

            <div className="container-wrapper details-projects">
              <DetailsList date={date}/>
              <ProjectsList/>
            </div>
          </>
        ) : (
          <Loader fullSize/>
        )}
      </ContentBody>
    </>
  );
};


export default Planning;
