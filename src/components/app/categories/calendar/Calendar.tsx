import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Course } from '../../../../shared/types/course';
import { ContentBody, ContentHeader } from '../../../shared/content';

import CalendarPicker from './categories/Picker';
import CalendarDetails from './categories/Details';

import './Calendar.css';


const Calendar: FC = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);


  return (
    <>
      <ContentHeader title={t('calendar.title')}/>

      <ContentBody>
        <CalendarPicker setCourses={setCourses}/>
        <CalendarDetails courses={courses}/>
      </ContentBody>
    </>
  );
};


export default Calendar;
