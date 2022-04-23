import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';

import Absences from './categories/Absences';
import Homework from './categories/Homework';

import './Calendar.css';


const Calendar: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <ContentHeader title={t('calendar.title')}/>

      <ContentBody>
        <Homework/>
        <Absences/>
      </ContentBody>
    </>
  );
};


export default Calendar;
