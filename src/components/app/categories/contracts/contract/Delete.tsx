import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../store/store';
import { Contract } from '../../../../../shared/types/contract';
import { deleteContract } from '../../../../../store/features/contracts/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';


type Props = {
  open: boolean,
  contract: Contract,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const DeleteContract: FC<Props> = ({contract, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [studentCompany, setStudentCompany] = useState('');

  const userFullName = `${contract.User?.firstName} ${contract.User?.lastName}`;
  const textTemplate = `${userFullName} (${contract.company})`;


  const handleDeleteContract = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(deleteContract(contract.id)).unwrap();

      setOpen(false);
      toast.success(t('contracts.delete.success', {user: `${userFullName}`, company: contract.company}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setStudentCompany('');
  }, [open]);


  return (
    <Dialog
      fullWidth maxWidth="sm"
      components={{Root: 'form'}}
      open={open} onSubmit={handleDeleteContract}
      onClose={() => loading ? null : setOpen(false)}
    >
      <DialogTitle>{t('contracts.delete.title', {user: userFullName})}</DialogTitle>

      <DialogContent>
        <p>{t('contracts.delete.text')}</p>

        <TextField
          required autoFocus sx={{my: 1}} 
          margin="dense" variant="standard"
          label={textTemplate} value={studentCompany}
          onChange={e => setStudentCompany(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" disabled={loading} onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" color="error" variant="contained" 
          loading={loading} disabled={studentCompany !== textTemplate}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default DeleteContract;
