import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField } from '@mui/material';

import { GradeRequest } from '../../../../../shared/types/grade';
import { createGrade } from '../../../../../store/features/grades/slice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import GradeUserPicker from './UserPicker';


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
      toast.success(t('accounting.create.success'));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  return (
    <Dialog
      components={{Root: 'form'}}
      onSubmit={handleCreateGrade}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('grades.create.title')}</DialogTitle>

      <DialogContent>
        <GradeUserPicker type="user" grade={grade} setGrade={setGrade}/>
        <GradeUserPicker type="teacher" grade={grade} setGrade={setGrade}/>

        <Box className="MuiDialogContent-row" sx={{mt: 1}}>
          <TextField
            required
            type="number"
            variant="standard"
            name="cb-grade-grade"
            value={grade.average ?? ''}
            onChange={handleChangeGrade}
            label={t('grades.create.grade') + '/20'}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
          />
        </Box>

        <TextField
          name="cb-grade-comment"
          value={grade.comment ?? ''}
          required fullWidth multiline
          sx={{mb: 2}} margin="normal"
          label={t('grades.create.comment')}
          onChange={e => setGrade({...grade, comment: e.target.value})}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
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
