import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Box, Button, InputAdornment, TextField } from '@mui/material';

import { GradeRequest } from '../../../../../shared/types/grade';
import { createGrade } from '../../../../../store/features/grades/slice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import GradeUserPicker from './pickers/UserPicker';
import GradeCoursePicker from './pickers/CoursePicker';
import GradeTeacherPicker from './pickers/TeacherPicker';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newGradeRequest = (): GradeRequest => ({
  average: 0, comment: '', userId: 0, teacherId: 0, classroomHasCourseId: 0
});


const CreateGrade: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { gradesList } = useAppSelector(state => state.grades);

  const [loading, setLoading] = useState(false);
  const [grade, setGrade] = useState<GradeRequest>(newGradeRequest());


  const handleChangeGrade = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setGrade({...grade, average: value});
  };

  const handleCreateGrade = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(createGrade(grade)).unwrap();

      setOpen(false);
      setGrade(newGradeRequest());
      toast.success(t('grades.create.success'));
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
      open={open} onSubmit={handleCreateGrade}
      onClose={() => loading ? null : setOpen(false)}
    >
      <DialogTitle>{t('grades.create.title')}</DialogTitle>

      <DialogContent>
        <Box sx={{mb: 2}}>
          <GradeUserPicker grade={grade} setGrade={setGrade}/>
        </Box>

        <Box sx={{mb: 2}}>
          <GradeCoursePicker grade={grade} setGrade={setGrade}/>
        </Box>

        <Box sx={{mb: 2}}>
          <GradeTeacherPicker grade={grade} setGrade={setGrade}/>
        </Box>

        <Box sx={{mb: 2}}>
          <TextField
            type="number"
            required fullWidth
            name="cb-grade-grade"
            value={grade.average ?? ''}
            onChange={handleChangeGrade}
            label={t('grades.fields.grade')}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*', min: 0, max: 20, step: 0.01}}
            InputProps={{
              autoComplete: Date.now().toString(), // requires a unique value to be disabled
              endAdornment: <InputAdornment position="end">/ 20</InputAdornment>
            }}
          />
        </Box>

        <TextField
          multiline fullWidth
          name="cb-grade-comment"
          value={grade.comment ?? ''}
          label={t('grades.fields.comment')}
          onChange={e => setGrade({...grade, comment: e.target.value})}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" disabled={loading} onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!gradesList || !(grade.userId && grade.teacherId)}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateGrade;
