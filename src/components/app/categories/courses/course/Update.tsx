import copy from 'fast-copy';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

import { Grade } from '../../../../../shared/types/grade';
import { useAppDispatch } from '../../../../../store/store';
import { updateGrade } from '../../../../../store/features/grades/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import GradeUserPicker from './UserPicker';


type Props = {
  grade: Grade,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const UpdateGrade: FC<Props> = ({grade, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
      await dispatch(updateGrade(grade)).unwrap();

      setOpen(false);
      toast.success(t('accounting.update.success'));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
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
        <GradeUserPicker type="user" grade={newGrade} setGrade={setNewGrade}/>
        <GradeUserPicker type="teacher" grade={newGrade} setGrade={setNewGrade}/>

        <Box className="MuiDialogContent-row" sx={{mt: 1}}>
          <TextField
            required
            type="number"
            variant="standard"
            name="cb-grade-grade"
            onChange={handleChangeGrade}
            value={newGrade.average ?? ''}
            label={t('grades.update.grade')}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
          />
        </Box>

        <TextField
          name="cb-grade-comment"
          required fullWidth multiline
          sx={{mb: 2}} margin="normal"
          value={newGrade.comment ?? ''}
          label={t('grades.update.comment')}
          onChange={e => setNewGrade({...newGrade, comment: e.target.value})}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!(newGrade.userId && newGrade.teacherId)}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdateGrade;
