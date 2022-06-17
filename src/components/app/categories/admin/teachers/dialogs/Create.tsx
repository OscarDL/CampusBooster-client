import { toast } from 'react-toastify';
import { Box, Button } from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Classroom } from '../../../../../../shared/types/classroom';
import { TeacherRequest } from '../../../../../../shared/types/teacher';
import { getCourses } from '../../../../../../store/features/courses/slice';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { createTeacher } from '../../../../../../store/features/teachers/slice';
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
  const { teachersList } = useAppSelector(state => state.teachers);

  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState(newTeacherRequest());
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom>();


  const handleCreateTeacher = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const addedTeacher = await dispatch(createTeacher(teacher)).unwrap();

      // Update courses list with new teacher for concerned course
      await dispatch(getCourses());

      setOpen(false);
      setTeacher(newTeacherRequest());
      toast.success(t('admin.teachers.add.success', {
        user: `${addedTeacher.User.firstName} ${addedTeacher.User.lastName}`
      }));
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
      open={open} onSubmit={handleCreateTeacher}
      onClose={() => loading ? null : setOpen(false)}
    >
      <DialogTitle>{t('admin.teachers.add.title')}</DialogTitle>

      <DialogContent>
        <Box sx={{mb: 2}}>
          <TeacherUserPicker
            teacher={teacher}
            setTeacher={setTeacher}
            setClassroom={setSelectedClassroom}
          />
        </Box>

        <Box sx={{mb: 2}}>
          <TeacherClassroomPicker
            teacher={teacher}
            setTeacher={setTeacher}
            classroom={selectedClassroom}
            setClassroom={setSelectedClassroom}
          />
        </Box>

        <TeacherCoursePicker
          teacher={teacher}
          setTeacher={setTeacher}
          classroom={selectedClassroom}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" disabled={loading} onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!teachersList || !teacher.userId || !teacher.classroomHasCourseId}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateTeacher;
