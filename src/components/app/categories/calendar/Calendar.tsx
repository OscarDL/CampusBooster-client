import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';

import Homework from './categories/Homework';
import CalendarPicker from './categories/Picker';

import './Calendar.css';


const Calendar: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('calendar.title')}/>

      <ContentBody>
        <CalendarPicker/>
        <Homework/>
      </ContentBody>
    </>
  );
};


export default Calendar;
