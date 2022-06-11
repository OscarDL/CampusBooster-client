import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { useAppDispatch } from '../../../../../../../../store/store';
import { Classroom } from '../../../../../../../../shared/types/classroom';
import { ProjectRequest } from '../../../../../../../../shared/types/project';
import { createProject } from '../../../../../../../../store/features/projects/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../../../shared/dialog';

import ProjectCoursePicker from './CoursePicker';
import ProjectClassroomPicker from '../../ClassroomPicker';


type Props = {
  open: boolean,
  classroom: Classroom | undefined,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newProjectRequest = (): ProjectRequest => ({
  classroomHasCourseId: 0, link: '', title: '', details: '',
  startDate: dayjs().toISOString(), endDate: dayjs().add(1, 'month').toISOString(),
});


const CreateProject: FC<Props> = ({classroom, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(newProjectRequest());


  const handleCreateProject = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(createProject(project)).unwrap();

      setOpen(false);
      setProject(newProjectRequest());
      toast.success(t('admin.projects.create.success'));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  return (
    <Dialog
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      onSubmit={handleCreateProject}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('admin.projects.create.title')}</DialogTitle>

      <DialogContent>
        <Box sx={{mb: 2}}>
          <ProjectClassroomPicker disabled classroom={classroom}/>
        </Box>

        <Box sx={{mb: 2}}>
          <ProjectCoursePicker
            project={project}
            classroom={classroom}
            setProject={setProject}
          />
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="MuiDialogContent-row" sx={{mt: 2}}>
            <DatePicker
              label={t('admin.projects.fields.start_date')}
              value={project.startDate ? dayjs(project.startDate) : null}
              renderInput={(params) => <TextField {...params} variant="standard" InputLabelProps={{shrink: true}}/>}
              onChange={date => setProject({...project, startDate: date?.isValid() ? dayjs(date).toISOString() : ''})}
            />
            <DatePicker
              label={t('admin.projects.fields.end_date')}
              value={project.endDate ? dayjs(project.endDate) : null}
              renderInput={(params) => <TextField {...params} variant="standard" InputLabelProps={{shrink: true}}/>}
              onChange={date => setProject({...project, endDate: date?.isValid() ? dayjs(date).toISOString() : ''})}
            />
          </Box>
        </LocalizationProvider>

        <Box className="MuiDialogContent-row">
          <TextField
            required
            margin="dense"
            variant="standard"
            value={project.title}
            name="cb-project-title"
            label={t('admin.projects.fields.title')}
            onChange={e => setProject({...project, title: e.target.value})}
          />
          <TextField
            required
            margin="dense"
            variant="standard"
            value={project.link}
            name="cb-project-link"
            label={t('admin.projects.fields.link')}
            onChange={e => setProject({...project, link: e.target.value})}
          />
        </Box>

        <TextField
          sx={{mb: 2}}
          margin="normal"
          fullWidth multiline
          name="cb-project-details"
          value={project.details ?? ''}
          label={t('admin.projects.fields.details')}
          onChange={e => setProject({...project, details: e.target.value})}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!(project.classroomHasCourseId && project.title && project.link)}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateProject;
