import copy from 'fast-copy';
import { toast } from 'react-toastify';
import isEqual from 'react-fast-compare';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

import { Teacher } from '../../../../../../shared/types/teacher';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { updateTeacher } from '../../../../../../store/features/teachers/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';


type Props = {
  open: boolean,
  teacher: Teacher,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const UpdateTeacher: FC<Props> = ({teacher, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { teachersList } = useAppSelector(state => state.teachers);

  const [loading, setLoading] = useState(false);
  const [newTeacher, setNewTeacher] = useState(copy(teacher));
  const userFullName = `${teacher.User.firstName} ${teacher.User.lastName}`;


  const handleUpdateTeacher = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(updateTeacher(teacher)).unwrap();

      setOpen(false);
      toast.success(t('admin.teachers.update.success', {teacher: userFullName}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setNewTeacher(copy(teacher));
  }, [teacher, open]);


  return (
    <Dialog
      components={{Root: 'form'}}
      onSubmit={handleUpdateTeacher}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('admin.teachers.update.title', {teacher: userFullName})}</DialogTitle>

      <DialogContent>
        <Box sx={{mb: 2}}>
          REACT SELECT TEACHERS
          <b>{t('admin.teachers.update.select_teacher')}</b>
        </Box>
        <Box sx={{mb: 2}}>
          REACT SELECT CLASSROOM
          <b>{t('admin.teachers.update.select_teacher')}</b>
        </Box>
        <Box>
          REACT SELECT COURSE
          <b>{t('admin.teachers.update.select_teacher')}</b>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!teachersList || isEqual(teacher, newTeacher) || !newTeacher.classroomHasCourseId || !newTeacher.userId}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdateTeacher;
