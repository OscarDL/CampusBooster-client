import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../../store/store';
import { Classroom } from '../../../../../../shared/types/classroom';
import { deleteClassroom } from '../../../../../../store/features/classrooms/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';


type Props = {
  open: boolean,
  classroom: Classroom,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const DeleteClassroom: FC<Props> = ({classroom, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [classroomName, setClassroomName] = useState('');


  const handleDeleteClassroom = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(deleteClassroom(classroom.id)).unwrap();

      setOpen(false);
      toast.success(t('admin.classrooms.delete.success', {classroom: classroom.name}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setClassroomName('');
  }, [open]);


  return (
    <Dialog
      fullWidth maxWidth="sm"
      components={{Root: 'form'}}
      open={open} onSubmit={handleDeleteClassroom}
      onClose={() => loading ? null : setOpen(false)}
    >
      <DialogTitle>{t('admin.classrooms.delete.title', {classroom: classroom.name})}</DialogTitle>

      <DialogContent>
        <p>{t('admin.classrooms.delete.text')}</p>

        <TextField
          required autoFocus sx={{my: 1}}
          margin="dense" variant="standard"
          label={classroom.name} value={classroomName}
          onChange={e => setClassroomName(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" disabled={loading} onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" color="error" variant="contained"
          loading={loading} disabled={classroomName !== classroom.name}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default DeleteClassroom;
