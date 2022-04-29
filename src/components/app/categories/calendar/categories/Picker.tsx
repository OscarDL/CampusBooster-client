import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { IconButton, TextField } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';

import { ContentHeader } from '../../../../shared/content';
import { RenderDay } from '../../../../../shared/types/calendar';
import { getFakeCalendar } from '../../../../../shared/fake/data';
import { Course, CourseType } from '../../../../../shared/types/course';

import Container from '../../../../shared/container';


const dateColor = {
  absence: 'red',
  exam: 'purple',
  course: 'skyblue',
  entreprise: 'blue',
  none: 'transparent'
};

type Props = {
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>
};


const Absences: FC<Props> = ({setCourses}) => {
  const { t } = useTranslation();
  const [calendarData] = useState(getFakeCalendar());
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [selected, setSelected] = useState<dayjs.Dayjs | null>(dayjs());


  const toggleDatePicker = () => setShowDatePicker(showDp => !showDp);

  const renderDay: RenderDay = (day, _, props) => {
    const dayInPlanning = calendarData.planning.find(date => (
      date.dates?.map(d => new Date(d.setHours(0)).toString()).includes(day.toDate().toString())
    ));
    const dayInAbsence = calendarData.absences.find(date => (
      date.dates?.map(d => new Date(d.setHours(0)).toString()).includes(day.toDate().toString())
    ));

    const courseType = (): CourseType => {
      if (dayInAbsence) return dayInAbsence.type as CourseType;
      else if (dayInPlanning) return dayInPlanning.type as CourseType;
      return '';
    };

    return (
      <PickersDay
        day={day}
        key={day.toString()}
        onDaySelect={() => null}
        selected={props.selected}
        outsideCurrentMonth={props.outsideCurrentMonth}
        style={props.selected ? {} : {backgroundColor: dateColor[courseType() || 'none']}}
      />
    );
  };

  const handleChangeContent = useCallback((date: dayjs.Dayjs) => {
    const data = calendarData.planning.filter(course => (
      course.dates?.map(d => d.getMonth()).includes(date.month())
    ));

    setCourses(data);
  }, [calendarData.planning, setCourses]);


  useEffect(() => {
    handleChangeContent(dayjs());
  }, [handleChangeContent]);


  return (
    // StaticDatePicker doesn't have a style attribute, so we can
    // hide it conditionally using CSS and this container's class
    <Container className={showDatePicker ? 'picker' : 'picker hide'}>
      <ContentHeader title={dayjs(selected).format(t('dayjs-format'))}>
        <IconButton id="hide-calendar-btn" onClick={toggleDatePicker}>
          <span className="material-icons" style={{transform: `rotateZ(${showDatePicker ? 0 : -180}deg)`}}>
            expand_less
          </span>
        </IconButton>
      </ContentHeader>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          value={selected}
          renderDay={renderDay}
          onChange={setSelected}
          views={['month', 'day']}
          className="calendar-date-picker"
          displayStaticWrapperAs="desktop"
          onMonthChange={handleChangeContent}
          maxDate={dayjs(new Date()).add(2, 'year')}
          minDate={dayjs(new Date()).subtract(5, 'year')}
          renderInput={(params) => <TextField {...params}/>}
        />
      </LocalizationProvider>
    </Container>
  );
};


export default Absences;
