import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { Grade } from '../../../../../shared/types/grades';
import { useAppDispatch } from '../../../../../store/store';
import { deleteGrade } from '../../../../../store/features/grades/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';


type Props = {
  grade: Grade,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const DeleteGrade: FC<Props> = ({grade, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [userGrade, setUserGrade] = useState('');

  const textTemplate = `${grade.User.firstName} ${grade.User.lastName} (${grade.grade}/${grade.max})`;


  const handleDeleteGrade = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(deleteGrade(grade.id)).unwrap();

      setOpen(false);
      toast.success(t('grades.delete.success'));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setUserGrade('');
  }, [open]);


  return (
    <Dialog
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      onSubmit={handleDeleteGrade}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('accounting.delete.title')}</DialogTitle>

      <DialogContent sx={{pt: '0 !important'}}>
        <p>{t('grades.delete.text', {text: textTemplate})}</p>

        <TextField
          required autoFocus
          margin="dense" variant="standard"
          label={t('grades.delete.user_grade')}
          onChange={e => setUserGrade(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" color="error" variant="contained" 
          loading={loading} disabled={userGrade !== textTemplate}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default DeleteGrade;
