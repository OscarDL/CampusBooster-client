import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Calendar from '../../components/app/categories/calendar';


const CalendarView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('calendar.title')}`;
  }, [t]);


  return (
    <div className="calendar-view">
      <Calendar/>
    </div>
  );
};


export default CalendarView;
