import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../store/store';
import { Balance } from '../../../../../shared/types/accounting';
import { deleteBalance } from '../../../../../store/features/accounting/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';


type Props = {
  open: boolean,
  balance: Balance,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const DeleteBalance: FC<Props> = ({balance, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [studentDesc, setStudentDesc] = useState('');

  const userFullName = `${balance.User?.firstName} ${balance.User?.lastName}`;
  const textTemplate = `${userFullName} (${balance.description})`;


  const handleDeleteBalance = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(deleteBalance(balance.id)).unwrap();

      setOpen(false);
      toast.success(t('accounting.delete.success'));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setStudentDesc('');
  }, [open]);


  return (
    <Dialog
      fullWidth maxWidth="sm"
      components={{Root: 'form'}}
      open={open} onSubmit={handleDeleteBalance}
      onClose={() => loading ? null : setOpen(false)}
    >
      <DialogTitle>{t('accounting.delete.title', {user: userFullName})}</DialogTitle>

      <DialogContent>
        <p>{t('accounting.delete.text')}</p>

        <TextField
          required autoFocus sx={{my: 1}}
          margin="dense" variant="standard"
          label={textTemplate} value={studentDesc}
          onChange={e => setStudentDesc(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" disabled={loading} onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" color="error" variant="contained" 
          loading={loading} disabled={studentDesc !== textTemplate}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default DeleteBalance;
