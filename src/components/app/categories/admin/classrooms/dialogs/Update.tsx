import copy from 'fast-copy';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

import { Classroom } from '../../../../../../shared/types/classroom';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { updateClassroom } from '../../../../../../store/features/classrooms/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';

import CampusPicker from './CampusPicker';


type Props = {
  open: boolean,
  classroom: Classroom,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const UpdateClassroom: FC<Props> = ({classroom, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { classroomsList } = useAppSelector(state => state.classrooms);

  const [loading, setLoading] = useState(false);
  const [newClassroom, setNewClassroom] = useState(copy(classroom));


  const handleChangePromotion = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setNewClassroom({...newClassroom, promotion: value});
  };

  const handleUpdateClassroom = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(updateClassroom(newClassroom)).unwrap();

      setOpen(false);
      toast.success(t('admin.classrooms.update.success', {classroom: classroom.name}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setNewClassroom(copy(classroom));
  }, [classroom, open]);


  return (
    <Dialog
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      onSubmit={handleUpdateClassroom}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('admin.classrooms.update.title', {classroom: classroom.name})}</DialogTitle>

      <DialogContent>
        <CampusPicker classroom={newClassroom} setClassroom={setNewClassroom}/>

        <TextField
          required
          margin="dense"
          variant="standard"
          name="cb-classroom-name"
          value={newClassroom.name}
          label={t('admin.classrooms.fields.name')}
          onChange={e => setNewClassroom({...newClassroom, name: e.target.value})}
        />

        <TextField
          required
          type="number"
          margin="dense"
          variant="standard"
          name="cb-classroom-promotion"
          value={newClassroom.promotion}
          onChange={handleChangePromotion}
          label={t('admin.classrooms.fields.promotion')}
          placeholder={String(new Date().getFullYear())}
          inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!classroomsList || !newClassroom.name || !newClassroom.promotion}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdateClassroom;
