import { toast } from 'react-toastify';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField } from '@mui/material';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { updateClassroom } from '../../../../../../store/features/classrooms/slice';
import { Classroom, ClassroomRequest } from '../../../../../../shared/types/classroom';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';

import CampusPicker from './CampusPicker';
import CoursesPicker from './CoursesPicker';


type Props = {
  open: boolean,
  classroom: Classroom,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const newClassroomRequest = (classroom: Classroom): ClassroomRequest => ({
  id: classroom.id, name: classroom.name, promotion: classroom.promotion,
  campusId: classroom.campusId, courses: classroom.ClassroomHasCourses?.map(chc => chc.courseId) ?? []
});


const UpdateClassroom: FC<Props> = ({classroom, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { classroomsList } = useAppSelector(state => state.classrooms);

  const [loading, setLoading] = useState(false);
  const [newClassroom, setNewClassroom] = useState(newClassroomRequest(classroom));

  const classroomEqual = useMemo(() => (
    isEqual(newClassroomRequest(classroom), newClassroom)
  ), [classroom, newClassroom]);


  const handleChangePromotion = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setNewClassroom({...newClassroom, promotion: value});
  };

  const handleUpdateClassroom = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const request = {
        classroom: newClassroom,
        addCourses: newClassroom.courses.filter(course => (
          !(classroom.ClassroomHasCourses ?? []).map(chc => chc.courseId).includes(course)
        )),
        removeCourses: (classroom.ClassroomHasCourses ?? [])
          .filter(chc => !newClassroom.courses.includes(chc.courseId))
          .map(chc => chc.courseId)
      };

      await dispatch(updateClassroom(request)).unwrap();

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
    if (open) setNewClassroom(newClassroomRequest(classroom));
  }, [classroom, open]);


  return (
    <Dialog
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      onSubmit={handleUpdateClassroom}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('admin.classrooms.update.title', {classroom: classroom.name})}</DialogTitle>

      <DialogContent sx={{pt: '0 !important'}}>
        <Box className="MuiDialogContent-row">
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
            margin="dense"
            variant="standard"
            name="cb-classroom-promotion"
            onChange={handleChangePromotion}
            value={newClassroom.promotion || ''}
            label={t('admin.classrooms.fields.promotion')}
            placeholder={String(new Date().getFullYear())}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
          />
        </Box>

        <Box sx={{my: 2}}>
          <CampusPicker classroom={newClassroom} setClassroom={setNewClassroom}/>
        </Box>

        <CoursesPicker classroom={newClassroom} setClassroom={setNewClassroom}/>
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!classroomsList || classroomEqual || !newClassroom.name || !newClassroom.promotion}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdateClassroom;
