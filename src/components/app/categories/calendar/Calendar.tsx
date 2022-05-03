import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Task } from '../../../../shared/types/calendar';
import { Course } from '../../../../shared/types/course';
import { ContentBody, ContentHeader } from '../../../shared/content';

import Picker from './categories/Picker';
import TasksList from './categories/tasks/List';
import DetailsList from './categories/details/List';

import './Calendar.css';


const Calendar: FC = () => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);


  return (
    <>
      <ContentHeader title={t('calendar.title')}/>

      <ContentBody>
        <Picker setTasks={setTasks} setCourses={setCourses}/>

        <div className="container-wrapper details-tasks">
          <DetailsList courses={courses}/>
          <TasksList tasks={tasks}/>
        </div>
      </ContentBody>
    </>
  );
};


export default Calendar;
