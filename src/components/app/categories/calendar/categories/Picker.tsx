import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';

import { ContentHeader } from '../../../../shared/content';
import { RenderDay } from '../../../../../shared/types/calendar';

import Container from '../../../../shared/container';
import { getFakeCalendar } from '../../../../../shared/fake/data';


type DateTypes = 'absence' | 'exam' | 'course' | 'entreprise' | 'none';
const dateColor = {
  absence: 'red',
  exam: 'purple',
  course: 'skyblue',
  entreprise: 'blue',
  none: 'transparent'
};


const Absences: FC = () => {
  const { t } = useTranslation();
  const [dates] = useState(getFakeCalendar());
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [selected, setSelected] = useState<dayjs.Dayjs | null>(dayjs());


  const toggleDatePicker = () => setShowDatePicker(showDp => !showDp);

  const renderDay: RenderDay = (day, _, props) => {
    const dayInPlanning = dates.planning.find(date => (
      date.dates.map(d => new Date(d.setHours(0)).toString()).includes(day.toDate().toString())
    ));
    const dayInAbsence = dates.absences.find(date => (
      date.dates.map(d => new Date(d.setHours(0)).toString()).includes(day.toDate().toString())
    ));

    const dateType = (): DateTypes => {
      if (dayInAbsence) return dayInAbsence.type as DateTypes;
      else if (dayInPlanning) return dayInPlanning.type as DateTypes;
      return 'none';
    };

    return (
      <PickersDay
        day={day}
        selected={props.selected}
        onDaySelect={props.onDaySelect}
        outsideCurrentMonth={props.outsideCurrentMonth}
        style={props.selected ? {} : {backgroundColor: dateColor[dateType()]}}
      />
    );
  };


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
          onChange={setSelected}
          renderDay={renderDay}
          className="calendar-date-picker"
          displayStaticWrapperAs="desktop"
          maxDate={dayjs(new Date()).add(2, 'year')}
          minDate={dayjs(new Date()).subtract(5, 'year')}
          renderInput={(params) => <TextField {...params}/>}
        />
      </LocalizationProvider>
    </Container>
  );
};


export default Absences;
