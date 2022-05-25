import copy from 'fast-copy';
import { toast } from 'react-toastify';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Box, Button, InputAdornment, TextField } from '@mui/material';

import { Grade } from '../../../../../shared/types/grade';
import { updateGrade } from '../../../../../store/features/grades/slice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import GradeUserPicker from './pickers/UserPicker';
import GradeCoursePicker from './pickers/CoursePicker';
import GradeTeacherPicker from './pickers/TeacherPicker';


type Props = {
  grade: Grade,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const UpdateGrade: FC<Props> = ({grade, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { gradesList } = useAppSelector(state => state.grades);

  const [loading, setLoading] = useState(false);
  const [newGrade, setNewGrade] = useState(copy(grade));


  const handleChangeGrade = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setNewGrade({...newGrade, average: value});
  };

  const handleUpdateGrade = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(updateGrade(newGrade)).unwrap();

      setOpen(false);
      toast.success(t('grades.update.success'));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    if (open) setNewGrade(copy(grade));
  }, [grade, open]);


  return (
    <Dialog
      components={{Root: 'form'}}
      onSubmit={handleUpdateGrade}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('grades.update.title')}</DialogTitle>

      <DialogContent>
        <Box sx={{mb: 2}}>
          <GradeUserPicker grade={newGrade} setGrade={setNewGrade}/>
        </Box>

        <Box sx={{mb: 2}}>
          <GradeCoursePicker grade={newGrade} setGrade={setNewGrade}/>
        </Box>
        
        <Box sx={{mb: 2}}>
          <GradeTeacherPicker grade={newGrade} setGrade={setNewGrade}/>
        </Box>

        <Box sx={{mb: 2}}>
          <TextField
            type="number"
            required fullWidth
            name="cb-grade-grade"
            onChange={handleChangeGrade}
            value={newGrade.average ?? ''}
            label={t('grades.fields.grade')}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*', min: 0, max: 20}}
            InputProps={{
              autoComplete: Date.now().toString(), // requires a unique value to be disabled
              endAdornment: <InputAdornment position="end">/ 20</InputAdornment>
            }}
          />
        </Box>

        <TextField
          multiline fullWidth
          name="cb-grade-comment"
          value={newGrade.comment ?? ''}
          label={t('grades.fields.comment')}
          onChange={e => setNewGrade({...newGrade, comment: e.target.value})}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!gradesList || !newGrade.teacherId || isEqual(grade, newGrade)}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdateGrade;
