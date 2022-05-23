import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';

import { User } from '../../../../../shared/types/user';
import { useAppDispatch } from '../../../../../store/store';
import { deleteUser } from '../../../../../store/features/users/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';


type Props = {
  user: User,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const DeleteUser: FC<Props> = ({user, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteInAD, setDeleteInAD] = useState(false);
  const userFullName = `${user.firstName} ${user.lastName}`;


  const handleDeleteUser = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(deleteUser({user, deleteInAD})).unwrap();

      setName('');
      setOpen(false);
      toast.success(t('users.delete.success', {user: userFullName}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setName('');
  }, [open]);


  return (
    <Dialog
      onSubmit={handleDeleteUser}
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('users.delete.title', {user: userFullName})}</DialogTitle>

      <DialogContent sx={{pt: '0 !important'}}>
        <p>{t('users.delete.text')}</p>

        <TextField
          required autoFocus
          label={t('users.delete.name')}
          margin="dense" variant="standard"
          onChange={e => setName(e.target.value)}
        />

        <FormGroup>
          <FormControlLabel
            label={t('users.delete.azure')}
            control={<Checkbox checked={deleteInAD} onChange={e => setDeleteInAD(e.target.checked)}/>}
          />
        </FormGroup>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" color="error" variant="contained"
          loading={loading} disabled={name !== userFullName}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default DeleteUser;
