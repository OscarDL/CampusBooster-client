import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Task } from '../../../../shared/types/calendar';
import { Course } from '../../../../shared/types/course';
import { ContentBody, ContentHeader } from '../../../shared/content';

import Homework from './categories/Homework';
import CalendarPicker from './categories/Picker';
import CalendarDetails from './categories/Details';

import './Calendar.css';


const Calendar: FC = () => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);


  return (
    <>
      <ContentHeader title={t('calendar.title')}/>

      <ContentBody>
        <CalendarPicker setTasks={setTasks} setCourses={setCourses}/>

        <div className="container-wrapper details-homework">
          <CalendarDetails courses={courses}/>
          <Homework tasks={tasks}/>
        </div>
      </ContentBody>
    </>
  );
};


export default Calendar;
