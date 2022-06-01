import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { FC, useCallback, useEffect, useState } from 'react';
import { Divider, IconButton, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';

import { ContentHeader } from '../../../../../shared/content';
import { colors } from '../../../../../../shared/utils/values';
import { RenderDay } from '../../../../../../shared/types/planning';
import { getFakeCalendar } from '../../../../../../shared/fake/data';
import { CourseType, FakeCourse, FakeProject } from '../../../../../../shared/types/course';

import Container from '../../../../../shared/container';


type Props = {
  date: dayjs.Dayjs | null,
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>,
  setProjects: React.Dispatch<React.SetStateAction<FakeProject[]>>,
  setCourses: React.Dispatch<React.SetStateAction<FakeCourse[]>>
};


const Calendar: FC<Props> = ({date, setDate, setProjects, setCourses}) => {
  const { t } = useTranslation();
  const [calendarData] = useState(getFakeCalendar());
  const [showDatePicker, setShowDatePicker] = useState(true);


  const toggleDatePicker = () => setShowDatePicker(showDp => !showDp);

  const renderDay: RenderDay = (day, _, props) => {
    const dayInPlanning = calendarData.courses.find(date => (
      date.dates?.map(d => new Date(d.setHours(0)).toString()).includes(day.toDate().toString())
    ));

    const courseType = (): CourseType => (
      dayInPlanning ? dayInPlanning.type as CourseType : CourseType.Empty
    );
    const dayStyle = {
      color: courseType() && 'white',
      backgroundColor: `var(--course-color-${courseType()})`
    };
  
    const isToday = day.format(t('global.date-compare')) === dayjs().format(t('global.date-compare'));

    return (
      <PickersDay
        day={day}
        selected={isToday}
        key={day.toString()}
        onDaySelect={() => null}
        style={isToday ? {} : dayStyle}
        outsideCurrentMonth={props.outsideCurrentMonth}
      />
    );
  };

  const handleChangeContent = useCallback((date: dayjs.Dayjs) => {
    const courses = calendarData.courses.filter(course => (
      course.dates?.map(d => d.getMonth()).includes(date.month())
    ));

    setDate(date);
    setCourses(courses);
  }, [calendarData.courses, setDate, setCourses]);


  useEffect(() => {
    // Fetch planning & projects from API
    if (date) {
      handleChangeContent(date);

      // Tasks only need to be setup once, not on every month change
      const projects = calendarData.projects.filter(project => {
        const startsBefore = new Date().getMonth() >= project.dateStart.getMonth();
        const endsAfter = new Date().getMonth() <= project.dateEnd.getMonth();
        return startsBefore && endsAfter;
      });
      setProjects(projects);
    }
  }, [handleChangeContent, calendarData.projects, date, setProjects]);


  return (
    // StaticDatePicker doesn't have a style attribute, so we can
    // hide it conditionally using CSS and this container's class
    <Container className={showDatePicker ? 'calendar-picker' : 'calendar-picker hide'}>
      <ContentHeader title={dayjs().format(t('global.date-mmm-d-yyyy'))}>
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

      <div className="calendar-picker-legend">
        {colors.calendarPicker.map(color => (
          <div key={color} style={{backgroundColor: `var(--course-color-${color})`}}>
            {t('planning.colors.' + color)}
          </div>
        ))}
      </div>
    </Container>
  );
};


export default Calendar;
