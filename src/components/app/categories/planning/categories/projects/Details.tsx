import dayjs from 'dayjs';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { FakeProject } from '../../../../../../shared/types/course';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '../../../../../shared/dialog';


type Props = {
  open: boolean,
  project: FakeProject,
  setDetails: React.Dispatch<React.SetStateAction<FakeProject | undefined>>
};


const ProjectDetails: FC<Props> = ({open, project, setDetails}) => {
  const { t } = useTranslation();


  return (
    <Dialog
      fullWidth open={open} maxWidth="sm"
      onClose={() => setDetails(undefined)}
    >
      <DialogTitle>{project.course.name} - {project.title}</DialogTitle>

      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="MuiDialogContent-row">
            <DatePicker readOnly
              onChange={() => null}
              value={dayjs(project.dateStart)}
              label={t('planning.projects.details.date_start')}
              renderInput={(params) => <TextField {...params} variant="standard" InputProps={{endAdornment: null}}/>}
            />
            <DatePicker readOnly
              onChange={() => null}
              value={dayjs(project.dateEnd)}
              label={t('planning.projects.details.date_end')}
              renderInput={(params) => <TextField {...params} variant="standard" InputProps={{endAdornment: null}}/>}
            />
          </Box>
        </LocalizationProvider>

        <Typography sx={{mt: 2}}>
          {project.details}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setDetails(undefined)}>{t('global.close')}</Button>
      </DialogActions>
    </Dialog>
  );
};


export default ProjectDetails;
