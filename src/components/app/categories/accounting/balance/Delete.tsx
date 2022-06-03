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
  const [description, setDescription] = useState('');


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
    if (open) setDescription('');
  }, [open]);


  return (
    <Dialog
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      onSubmit={handleDeleteBalance}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('accounting.delete.title')}</DialogTitle>

      <DialogContent>
        <p>{t('accounting.delete.text')}</p>

        <TextField
          sx={{mt: 2}}
          required autoFocus
          value={description}
          margin="dense" variant="standard"
          label={t('accounting.delete.description')}
          onChange={e => setDescription(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" color="error" variant="contained" 
          loading={loading} disabled={balance.description !== description}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default DeleteBalance;
