import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { ContentHeader } from '../../../../shared/content';

import Container from '../../../../shared/container';


const Absences: FC = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());


  return (
    <Container className="absences">
      <ContentHeader title={dayjs(date).format(t('dayjs-format'))}/>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          value={date}
          onChange={setDate}
          maxDate={dayjs(new Date()).add(2, 'year')}
          minDate={dayjs(new Date()).subtract(5, 'year')}
          renderInput={(params) => <TextField {...params} id="absences-date"/>}
        />
      </LocalizationProvider>
    </Container>
  );
};


export default Absences;
