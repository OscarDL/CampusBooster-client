import { toast } from 'react-toastify';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField } from '@mui/material';

import { ClassroomRequest } from '../../../../../../shared/types/classroom';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { createClassroom } from '../../../../../../store/features/classrooms/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';

import CampusPicker from './CampusPicker';
import CoursesPicker from './CoursesPicker';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const newClassroomRequest = (): ClassroomRequest => ({
  name: '', promotion: 0, campusId: undefined, courses: []
});


const CreateClassroom: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { classroomsList } = useAppSelector(state => state.classrooms);

  const [loading, setLoading] = useState(false);
  const [classroom, setClassroom] = useState(newClassroomRequest());


  const handleChangePromotion = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setClassroom({...classroom, promotion: value});
  };

  const handleCreateClassroom = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(createClassroom(classroom)).unwrap();

      setOpen(false);
      setClassroom(newClassroomRequest());
      toast.success(t('admin.classrooms.create.success', {classroom: classroom.name}));
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
      open={open} onSubmit={handleCreateClassroom}
      onClose={() => loading ? null : setOpen(false)}
    >
      <DialogTitle>{t('admin.classrooms.create.title', {classroom: classroom.name})}</DialogTitle>

      <DialogContent sx={{pt: '0 !important'}}>
        <Box className="MuiDialogContent-row">
          <TextField
            required
            margin="dense"
            variant="standard"
            value={classroom.name}
            name="cb-classroom-name"
            label={t('admin.classrooms.fields.name')}
            onChange={e => setClassroom({...classroom, name: e.target.value})}
          />

          <TextField
            required
            type="number"
            margin="dense"
            variant="standard"
            name="cb-classroom-promotion"
            onChange={handleChangePromotion}
            value={classroom.promotion || ''}
            label={t('admin.classrooms.fields.promotion')}
            placeholder={String(new Date().getFullYear())}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
          />
        </Box>

        <Box sx={{my: 2}}>
          <CampusPicker classroom={classroom} setClassroom={setClassroom}/>
        </Box>

        <CoursesPicker classroom={classroom} setClassroom={setClassroom}/>
      </DialogContent>

      <DialogActions>
        <Button color="error" disabled={loading} onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!classroomsList || !classroom.name || !classroom.promotion}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateClassroom;
