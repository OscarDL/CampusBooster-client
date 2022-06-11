import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { useAppDispatch } from '../../../../../../../../store/store';
import { Classroom } from '../../../../../../../../shared/types/classroom';
import { updateProject } from '../../../../../../../../store/features/projects/slice';
import { Project, ProjectRequest } from '../../../../../../../../shared/types/project';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../../../shared/dialog';

import ProjectCoursePicker from './CoursePicker';
import ProjectClassroomPicker from '../../ClassroomPicker';


type Props = {
  open: boolean,
  project: Project,
  classroom: Classroom | undefined,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newProjectRequest = (project: Project): ProjectRequest => ({
  id: project.id, classroomHasCourseId: project.classroomHasCourseId,
  link: project.link, title: project.title, details: project.details,
  startDate: dayjs(project.startDate).toISOString(), endDate: dayjs(project.endDate).toISOString(),
});


const UpdateProject: FC<Props> = ({classroom, project, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [newProject, setNewProject] = useState(newProjectRequest(project));


  const handleUpdateProject = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(updateProject(newProject)).unwrap();

      setOpen(false);
      toast.success(t('admin.projects.update.success'));
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
      onSubmit={handleUpdateProject}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('admin.projects.update.title')}</DialogTitle>

      <DialogContent>
        <Box sx={{mb: 2}}>
          <ProjectClassroomPicker disabled classroom={classroom}/>
        </Box>

        <Box sx={{mb: 2}}>
          <ProjectCoursePicker
            project={newProject}
            classroom={classroom}
            setProject={setNewProject}
          />
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="MuiDialogContent-row" sx={{mt: 2}}>
            <DatePicker
              label={t('admin.projects.fields.start_date')}
              value={newProject.startDate ? dayjs(newProject.startDate) : null}
              renderInput={(params) => <TextField {...params} variant="standard" InputLabelProps={{shrink: true}}/>}
              onChange={date => setNewProject({...newProject, startDate: date?.isValid() ? dayjs(date).toISOString() : ''})}
            />
            <DatePicker
              label={t('admin.projects.fields.end_date')}
              value={newProject.endDate ? dayjs(newProject.endDate) : null}
              renderInput={(params) => <TextField {...params} variant="standard" InputLabelProps={{shrink: true}}/>}
              onChange={date => setNewProject({...newProject, endDate: date?.isValid() ? dayjs(date).toISOString() : ''})}
            />
          </Box>
        </LocalizationProvider>

        <Box className="MuiDialogContent-row">
          <TextField
            required
            margin="dense"
            variant="standard"
            value={newProject.title}
            name="cb-project-title"
            label={t('admin.projects.fields.title')}
            onChange={e => setNewProject({...newProject, title: e.target.value})}
          />
          <TextField
            required
            margin="dense"
            variant="standard"
            value={newProject.link}
            name="cb-project-link"
            label={t('admin.projects.fields.link')}
            onChange={e => setNewProject({...newProject, link: e.target.value})}
          />
        </Box>

        <TextField
          sx={{mb: 2}}
          margin="normal"
          fullWidth multiline
          name="cb-project-details"
          value={newProject.details}
          label={t('admin.projects.fields.details')}
          onChange={e => setNewProject({...newProject, details: e.target.value})}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!(newProject.classroomHasCourseId && newProject.title && newProject.link)}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdateProject;
