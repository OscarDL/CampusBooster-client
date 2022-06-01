import { toast } from 'react-toastify';
import { Box, Button } from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../../../../store/store';
import { Classroom } from '../../../../../../shared/types/classroom';
import { createTeacher } from '../../../../../../store/features/teachers/slice';
import { Teacher, TeacherRequest } from '../../../../../../shared/types/teacher';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';

import TeacherUserPicker from './pickers/UserPicker';
import TeacherCoursePicker from './pickers/CoursePicker';
import TeacherClassroomPicker from './pickers/ClassroomPicker';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newTeacherRequest = (): TeacherRequest => ({
  active: true, classroomHasCourseId: 0, userId: 0
});


const CreateTeacher: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState(newTeacherRequest());
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom>();


  const handleCreateTeacher = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const addedTeacher: Teacher = await dispatch(createTeacher(teacher)).unwrap();

      setOpen(false);
      setTeacher(newTeacherRequest());
      toast.success(t('admin.teachers.create.success', {
        teacher: `${addedTeacher.User.firstName} ${addedTeacher.User.lastName}`
      }));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  return (
    <Dialog
      components={{Root: 'form'}}
      onSubmit={handleCreateTeacher}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('admin.campus.create.title')}</DialogTitle>

      <DialogContent>
        <Box sx={{mb: 2}}>
          <TeacherUserPicker teacher={teacher} setTeacher={setTeacher}/>
        </Box>

        <Box sx={{mb: 2}}>
          <TeacherClassroomPicker teacher={teacher} classroom={selectedClassroom} setClassroom={setSelectedClassroom}/>
        </Box>

        <TeacherCoursePicker classroom={selectedClassroom} teacher={teacher} setTeacher={setTeacher}/>
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!teacher.userId || !teacher.classroomHasCourseId}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateTeacher;
