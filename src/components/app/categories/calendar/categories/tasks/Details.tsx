import dayjs from 'dayjs';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { Task } from '../../../../../../shared/types/calendar';
import { DivPrompt, PromptActions, PromptBackdrop, PromptContent, PromptTitle, PromptWrapper } from '../../../../../shared/prompt';


type Props = {
  task: Task,
  setDetails: React.Dispatch<React.SetStateAction<Task | undefined>>
};


const TaskDetails: FC<Props> = ({task, setDetails}) => {
  const { t } = useTranslation();


  return (
    <PromptBackdrop animated>
      <DivPrompt animated>
        <PromptWrapper>
          <PromptTitle title={`${task.course.name} - ${task.title}`}/>

          <PromptContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="task-dates">
                <DatePicker readOnly
                  onChange={() => null}
                  value={dayjs(task.dateStart)}
                  label={t('calendar.tasks.details.date_start')}
                  renderInput={(params) => <TextField {...params} variant="standard" InputProps={{endAdornment: null}} />}
                />
                <DatePicker readOnly
                  onChange={() => null}
                  value={dayjs(task.dateEnd)}
                  label={t('calendar.tasks.details.date_end')}
                  renderInput={(params) => <TextField {...params} variant="standard" InputProps={{endAdornment: null}} />}
                />
              </div>
            </LocalizationProvider>

            <div>{task.details}</div>
          </PromptContent>
        </PromptWrapper>

        <PromptActions column>
          <Button className="btnSecondary" onClick={() => setDetails(undefined)}>
            {t('global.close')}
          </Button>
        </PromptActions>
      </DivPrompt>
    </PromptBackdrop>
  );
};


export default TaskDetails;
