import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';

import { Classroom } from '../../../../../shared/types/classroom';
import { ContentBody, ContentHeader } from '../../../../shared/content';
import { getProjects } from '../../../../../store/features/projects/slice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getPlannings } from '../../../../../store/features/plannings/slice';
import { getClassrooms } from '../../../../../store/features/classrooms/slice';

import Calendar from './categories/Calendar';
import Loader from '../../../../shared/loader';
import DetailsList from './categories/details/List';
import ProjectsList from './categories/projects/List';


const Planning: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { projectsList } = useAppSelector(state => state.projects);
  const { planningsList } = useAppSelector(state => state.plannings);
  const { classroomsList } = useAppSelector(state => state.classrooms);

  const [classroom, setClassroom] = useState<Classroom>();
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());

  const dataIsLoaded = planningsList && projectsList && classroomsList;


  useEffect(() => {
    const initData = async () => {
      if (!projectsList) await dispatch(getProjects());
      if (!classroomsList) await dispatch(getClassrooms());

      if (!planningsList) await dispatch(getPlannings());
    };

    // Do NOT include useEffect dependencies from initData() prior to user planning
    // to avoid calling the API with other dispatch calls multiple times unnecessarily.
    initData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planningsList, dispatch]);


  return (
    <>
      <ContentHeader backButton title={t('admin.plannings.title')}/>

      <ContentBody>
        {dataIsLoaded ? (
          <>
            <Calendar
              date={date}
              setDate={setDate}
              classroom={classroom}
              setClassroom={setClassroom}
            />

            <div className="container-wrapper details-projects">
              <DetailsList date={date} classroom={classroom}/>
              <ProjectsList classroom={classroom}/>
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
