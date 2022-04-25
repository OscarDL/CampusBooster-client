import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { ContentHeader } from '../../../../shared/content';

import Container from '../../../../shared/container';


const Absences: FC = () => {
  const { t } = useTranslation();
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());


  const toggleDatePicker = () => setShowDatePicker(showDp => !showDp);


  return (
    // StaticDatePicker doesn't have a style attribute, so we can
    // hide it conditionally using CSS and this container's class
    <Container className={showDatePicker ? '' : 'hide-calendar'}>
      <ContentHeader title={dayjs(date).format(t('dayjs-format'))}>
        <IconButton id="hide-calendar-btn" onClick={toggleDatePicker}>
          <span className="material-icons">
            {showDatePicker ? 'visibility' : 'visibility_off'}
          </span>
        </IconButton>
      </ContentHeader>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          value={date}
          onChange={setDate}
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
