import dayjs from 'dayjs';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { OpenInNewRounded } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { Project } from '../../../../../../shared/types/project';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '../../../../../shared/dialog';


type Props = {
  open: boolean,
  project: Project,
  setDetails: React.Dispatch<React.SetStateAction<Project | undefined>>
};


const ProjectDetails: FC<Props> = ({open, project, setDetails}) => {
  const { t } = useTranslation();


  return (
    <Dialog
      fullWidth open={open} maxWidth="sm"
      onClose={() => setDetails(undefined)}
    >
      <DialogTitle>{project.ClassroomHasCourse.Course?.name} - {project.title}</DialogTitle>

      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="MuiDialogContent-row">
            <DatePicker readOnly
              onChange={() => null}
              value={dayjs(project.startDate)}
              label={t('planning.projects.details.date_start')}
              renderInput={(params) => <TextField {...params} variant="standard" InputProps={{endAdornment: null}}/>}
            />
            <DatePicker readOnly
              onChange={() => null}
              value={dayjs(project.endDate)}
              label={t('planning.projects.details.date_end')}
              renderInput={(params) => <TextField {...params} variant="standard" InputProps={{endAdornment: null}}/>}
            />
          </Box>
        </LocalizationProvider>

        <Typography sx={{mt: 2}}>
          {project.details || t('planning.projects.details.no_details')}
        </Typography>

        <Button
          variant="contained"
          sx={{mt: 2}}
          endIcon={<OpenInNewRounded/>}
          onClick={() => window.open(project.link, '_blank')}
        >
          {t('planning.projects.details.canvas_link')}
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setDetails(undefined)}>{t('global.close')}</Button>
      </DialogActions>
    </Dialog>
  );
};


export default ProjectDetails;
