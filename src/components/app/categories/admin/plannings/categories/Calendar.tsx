import dayjs from 'dayjs';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, IconButton, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';

import { ContentHeader } from '../../../../../shared/content';
import { colors } from '../../../../../../shared/utils/values';
import { Classroom } from '../../../../../../shared/types/classroom';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { clearProjects } from '../../../../../../store/features/projects/slice';
import { clearPlannings } from '../../../../../../store/features/plannings/slice';
import { PlanningType, RenderDay } from '../../../../../../shared/types/planning';

import Container from '../../../../../shared/container';
import PlanningClassroomPicker from './ClassroomPicker';
import { Refresh } from '@mui/icons-material';


type Props = {
  date: dayjs.Dayjs | null,
  classroom: Classroom | undefined,
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>,
  setClassroom: React.Dispatch<React.SetStateAction<Classroom | undefined>>
};


const Calendar: FC<Props> = ({date, setDate, classroom, setClassroom}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { planningsList } = useAppSelector(state => state.plannings);


  const renderDay: RenderDay = (day, _, props) => {
    const dayInPlanning = planningsList?.find(planning => dayjs(planning.date).isSame(day, 'day'));
    const past = dayjs(dayInPlanning?.date).isBefore(dayjs(), 'day');

    const planningType = (): PlanningType => (
      dayInPlanning ? dayInPlanning.type : PlanningType.Empty
    );
    const dayStyle = {
      opacity: past ? 0.5 : 1,
      color: planningType() && 'white',
      backgroundColor: `var(--course-color-${planningType().toLowerCase()})`
    };
  
    const isToday = day.format(t('global.date.compare')) === dayjs().format(t('global.date.compare'));

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

  const refreshPlanningData = () => {
    dispatch(clearProjects());
    dispatch(clearPlannings());
  };


  useEffect(() => {
    // Fetch planning & projects from API
    if (date) setDate(date);
  }, [date, setDate]);


  return (
    // StaticDatePicker doesn't have a style attribute, so we can
    // hide it conditionally using CSS and this container's class
    <Container className="calendar-picker">
      <ContentHeader title={dayjs().format(t('global.date.mmm-d-yyyy'))}>
        {planningsList && (
          <IconButton
            color="primary"
            onClick={refreshPlanningData}
            sx={{justifySelf: 'flex-end', mt: '1px'}}
          >
            <Refresh/>
          </IconButton>
        )}
      </ContentHeader>

      <Divider sx={{mb: '1rem'}}/>

      <div style={{maxWidth: 'var(--max-calendar-picker-width)', margin: '0 auto'}}>
        <PlanningClassroomPicker classroom={classroom} setClassroom={setClassroom}/>
      </div>

      <Divider sx={{my: '1rem'}}/>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          value={date}
          renderDay={renderDay}
          onChange={() => null}
          onMonthChange={setDate}
          views={['month', 'day']}
          displayStaticWrapperAs="desktop"
          maxDate={dayjs(new Date()).add(2, 'year')}
          minDate={dayjs(new Date()).subtract(5, 'year')}
          leftArrowButtonText={t('global.date.prev_month')}
          rightArrowButtonText={t('global.date.next_month')}
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
