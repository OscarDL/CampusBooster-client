import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../../../../store/store';
import { Planning } from '../../../../../../../../shared/types/planning';
import { deletePlanningEntry } from '../../../../../../../../store/features/plannings/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../../../shared/dialog';


type Props = {
  open: boolean,
  planning: Planning,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const DeletePlanningEntry: FC<Props> = ({planning, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [courseDate, setCourseDate] = useState('');

  const course = planning.ClassroomHasCourse.Course?.name;
  const date = dayjs(planning.date).format(t('global.date.mm-dd-yyyy'));
  const textTemplate = `${course} (${date})`;

  const handleDeletePlanningEntry = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(deletePlanningEntry(planning.id)).unwrap();

      setOpen(false);
      toast.success(t('admin.plannings.delete.success'));
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
      open={open} fullWidth maxWidth="sm"
      onSubmit={handleDeletePlanningEntry}
    >
      <DialogTitle>{t('admin.plannings.delete.title')}</DialogTitle>

      <DialogContent>
        <p>{t('admin.plannings.delete.text')}</p>

        <TextField
          required autoFocus sx={{my: 1}}
          margin="dense" variant="standard"
          label={textTemplate} value={courseDate}
          onChange={e => setCourseDate(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          disabled={courseDate !== textTemplate}
          type="submit" variant="contained" loading={loading}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default DeletePlanningEntry;
