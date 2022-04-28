import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Course } from '../../../../shared/types/course';
import { ContentBody, ContentHeader } from '../../../shared/content';

import Homework from './categories/Homework';
import CalendarPicker from './categories/Picker';

import './Calendar.css';


const Calendar: FC = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);


  return (
    <>
      <ContentHeader title={t('calendar.title')}/>

      <ContentBody>
        <CalendarPicker setCourses={setCourses}/>
        <Homework courses={courses}/>
      </ContentBody>
    </>
  );
};


export default Calendar;
