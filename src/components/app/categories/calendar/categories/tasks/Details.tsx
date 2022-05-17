import dayjs from 'dayjs';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { Task } from '../../../../../../shared/types/calendar';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '../../../../../shared/dialog';


type Props = {
  task: Task,
  open: boolean,
  setDetails: React.Dispatch<React.SetStateAction<Task | undefined>>
};


const TaskDetails: FC<Props> = ({task, open, setDetails}) => {
  const { t } = useTranslation();


  return (
    <Dialog
      fullWidth open={open} maxWidth="sm"
      onClose={() => setDetails(undefined)}
    >
      <DialogTitle>{task.course.name} - {task.title}</DialogTitle>

      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="MuiDialogContent-row">
            <DatePicker readOnly
              onChange={() => null}
              value={dayjs(task.dateStart)}
              label={t('calendar.tasks.details.date_start')}
              renderInput={(params) => <TextField {...params} variant="standard" InputProps={{endAdornment: null}}/>}
            />
            <DatePicker readOnly
              onChange={() => null}
              value={dayjs(task.dateEnd)}
              label={t('calendar.tasks.details.date_end')}
              renderInput={(params) => <TextField {...params} variant="standard" InputProps={{endAdornment: null}}/>}
            />
          </Box>
        </LocalizationProvider>

        <Typography sx={{mt: 2}}>
          {task.details}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setDetails(undefined)}>{t('global.close')}</Button>
      </DialogActions>
    </Dialog>
  );
};


export default TaskDetails;
