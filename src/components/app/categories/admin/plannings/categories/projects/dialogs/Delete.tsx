import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../../../../store/store';
import { Project } from '../../../../../../../../shared/types/project';
import { deleteProject } from '../../../../../../../../store/features/projects/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../../../shared/dialog';


type Props = {
  open: boolean,
  project: Project,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const DeletePlanningEntry: FC<Props> = ({project, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [courseProject, setCourseProject] = useState('');

  const course = project.ClassroomHasCourse.Course?.name;
  const textTemplate = `${course} (${project.title})`;

  const handleDeletePlanningEntry = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(deleteProject(project.id)).unwrap();

      setOpen(false);
      toast.success(t('admin.projects.delete.success'));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  return (
    <Dialog
      fullWidth maxWidth="sm"
      components={{Root: 'form'}}
      onClose={() => loading ? null : setOpen(false)}
      open={open} onSubmit={handleDeletePlanningEntry}
    >
      <DialogTitle>{t('admin.projects.delete.title')}</DialogTitle>

      <DialogContent>
        <p>{t('admin.projects.delete.text')}</p>

        <TextField
          required autoFocus sx={{my: 1}}
          margin="dense" variant="standard"
          label={textTemplate} value={courseProject}
          onChange={e => setCourseProject(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" disabled={loading} onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          disabled={courseProject !== textTemplate}
          type="submit" variant="contained" loading={loading}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default DeletePlanningEntry;
