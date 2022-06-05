import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';

import { FakeProject } from '../../../../shared/types/course';
import { getLoggedInAuthState } from '../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { getUserPlanning } from '../../../../store/features/plannings/slice';

import Loader from '../../../shared/loader';
import Calendar from './categories/Calendar';
import TasksList from './categories/projects/List';
import DetailsList from './categories/details/List';


const Planning: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { planningsList } = useAppSelector(state => state.plannings);

  const [projects, setProjects] = useState<FakeProject[]>([]);
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());


  useEffect(() => {
    const initData = async () => {
      if (!planningsList) {
        await dispatch(getUserPlanning(user.id));
      }
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
        {planningsList ? (
          <>
            <Calendar
              date={date}
              setDate={setDate}
              setProjects={setProjects}
            />

            <div className="container-wrapper details-projects">
              <DetailsList date={date}/>
              <TasksList projects={projects}/>
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
