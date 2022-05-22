import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';
import { FakeCourse, FakeProject } from '../../../../shared/types/course';

import Calendar from './categories/Calendar';
import TasksList from './categories/projects/List';
import DetailsList from './categories/details/List';

import './Planning.css';


const Planning: FC = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<FakeCourse[]>([]);
  const [projects, setProjects] = useState<FakeProject[]>([]);
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());


  return (
    <>
      <ContentHeader title={t('planning.title')}/>

      <ContentBody>
        <Calendar
          date={date}
          setDate={setDate}
          setCourses={setCourses}
          setProjects={setProjects}
        />

        <div className="container-wrapper details-projects">
          <DetailsList courses={courses} date={date}/>
          <TasksList projects={projects}/>
        </div>
      </ContentBody>
    </>
  );
};


export default Planning;
