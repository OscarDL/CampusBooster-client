import { toast } from 'react-toastify';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

import { Classroom } from '../../../../../../shared/types/classroom';
import { getCourses } from '../../../../../../store/features/courses/slice';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { updateTeacher } from '../../../../../../store/features/teachers/slice';
import { Teacher, TeacherRequest } from '../../../../../../shared/types/teacher';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';

import TeacherUserPicker from './pickers/UserPicker';
import TeacherCoursePicker from './pickers/CoursePicker';
import TeacherClassroomPicker from './pickers/ClassroomPicker';


type Props = {
  open: boolean,
  teacher: Teacher,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const newTeacherRequest = (teacher: Teacher): TeacherRequest => ({
  id: teacher.id,
  active: teacher.active,
  userId: teacher.userId,
  classroomHasCourseId: teacher.classroomHasCourseId
});

const UpdateTeacher: FC<Props> = ({teacher, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { teachersList } = useAppSelector(state => state.teachers);
  const { classroomsList } = useAppSelector(state => state.classrooms);

  const [loading, setLoading] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom>();
  const [newTeacher, setNewTeacher] = useState(newTeacherRequest(teacher));
  const userFullName = `${teacher.User.firstName} ${teacher.User.lastName}`;


  const handleUpdateTeacher = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(updateTeacher(newTeacher)).unwrap();

      // Update courses list with updated teacher for concerned course
      await dispatch(getCourses());

      setOpen(false);
      toast.success(t('admin.teachers.update.success', {user: userFullName}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) {
      setNewTeacher(newTeacherRequest(teacher));

      setSelectedClassroom(
        classroomsList?.find(c => c.ClassroomHasCourses?.map(chc => chc.id).includes(teacher.classroomHasCourseId))
      );
    }
  }, [classroomsList, open, teacher]);


  return (
    <Dialog
      fullWidth maxWidth="sm"
      components={{Root: 'form'}}
      open={open} onSubmit={handleUpdateTeacher}
      onClose={() => loading ? null : setOpen(false)}
    >
      <DialogTitle>
        {t('admin.teachers.update.title', {
          teacher: userFullName,
          course: teacher.ClassroomHasCourse.Course?.name,
          classroom: teacher.ClassroomHasCourse.Classroom?.name
        })}
      </DialogTitle>

      <DialogContent>
        <Box sx={{mb: 2}}>
          <TeacherUserPicker
            teacher={newTeacher}
            setTeacher={setNewTeacher}
            setClassroom={setSelectedClassroom}
          />
        </Box>

        <Box sx={{mb: 2}}>
          <TeacherClassroomPicker
            teacher={newTeacher}
            setTeacher={setNewTeacher}
            classroom={selectedClassroom}
            setClassroom={setSelectedClassroom}
          />
        </Box>

        <TeacherCoursePicker
          teacher={newTeacher}
          setTeacher={setNewTeacher}
          classroom={selectedClassroom}
        />

        <FormGroup>
          <FormControlLabel
            label={t('admin.teachers.fields.active')}
            control={<Checkbox
              checked={newTeacher.active}
              onChange={e => setNewTeacher({...newTeacher, active: e.target.checked})}
            />}
          />
        </FormGroup>
      </DialogContent>

      <DialogActions>
        <Button color="error" disabled={loading} onClick={() => setOpen(false)}>
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
