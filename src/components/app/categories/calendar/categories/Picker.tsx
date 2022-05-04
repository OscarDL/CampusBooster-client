import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { FC, useCallback, useEffect, useState } from 'react';
import { Divider, IconButton, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';

import { colors } from '../../../../../shared/utils';
import { ContentHeader } from '../../../../shared/content';
import { getFakeCalendar } from '../../../../../shared/fake/data';
import { RenderDay, Task } from '../../../../../shared/types/calendar';
import { Course, CourseType } from '../../../../../shared/types/course';

import Container from '../../../../shared/container';


type Props = {
  date: dayjs.Dayjs | null,
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>
};


const Picker: FC<Props> = ({date, setDate, setTasks, setCourses}) => {
  const { t } = useTranslation();
  const [calendarData] = useState(getFakeCalendar());
  const [showDatePicker, setShowDatePicker] = useState(true);


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
    const dayStyle = {
      color: courseType() && 'white',
      backgroundColor: `var(--course-color-${courseType()})`
    };

    return (
      <PickersDay
        day={day}
        key={day.toString()}
        onDaySelect={() => null}
        selected={props.selected}
        style={props.selected ? {} : dayStyle}
        outsideCurrentMonth={props.outsideCurrentMonth}
      />
    );
  };

  const handleChangeContent = useCallback((date: dayjs.Dayjs) => {
    const courses = calendarData.planning.filter(course => (
      course.dates?.map(d => d.getMonth()).includes(date.month())
    ));

    setDate(date);
    setCourses(courses);
  }, [calendarData.planning, setDate, setCourses]);


  useEffect(() => {
    // Fetch tasks & planning from API
    if (date) {
      handleChangeContent(date);

      // Tasks only need to be setup once, not on every month change
      const tasks = calendarData.tasks.filter(task => {
        const startsBefore = new Date().getMonth() >= task.dateStart.getMonth();
        const endsAfter = new Date().getMonth() <= task.dateEnd.getMonth();
        return startsBefore && endsAfter;
      });
      setTasks(tasks);
    }
  }, [handleChangeContent, calendarData.tasks, date, setTasks]);


  return (
    // StaticDatePicker doesn't have a style attribute, so we can
    // hide it conditionally using CSS and this container's class
    <Container className={showDatePicker ? 'picker' : 'picker hide'}>
      <ContentHeader title={dayjs(date).format(t('global.date-mmm-dd-yyyy'))}>
        <IconButton id="hide-calendar-btn" onClick={toggleDatePicker}>
          <span className="material-icons" style={{transform: `rotateZ(${showDatePicker ? 0 : -180}deg)`}}>
            expand_less
          </span>
        </IconButton>
      </ContentHeader>

      <Divider sx={{mb: '1rem'}}/>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          value={date}
          onChange={setDate}
          renderDay={renderDay}
          views={['month', 'day']}
          displayStaticWrapperAs="desktop"
          onMonthChange={handleChangeContent}
          maxDate={dayjs(new Date()).add(2, 'year')}
          minDate={dayjs(new Date()).subtract(5, 'year')}
          renderInput={(params) => <TextField {...params}/>}
        />
      </LocalizationProvider>

      <Divider sx={{mb: '1rem'}}/>

      <div className="picker-legend">
        {colors.datePicker.map(color => (
          <div key={color} style={{backgroundColor: `var(--course-color-${color})`}}>
            {t('calendar.colors.' + color)}
          </div>
        ))}
      </div>
    </Container>
  );
};


export default Picker;
