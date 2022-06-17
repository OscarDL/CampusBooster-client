import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';

import { User, UserRoles } from '../../../../../shared/types/user';
import { deleteUser } from '../../../../../store/features/users/slice';
import { getCampus } from '../../../../../store/features/campus/slice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getLoggedInAuthState, userHasHigherRole } from '../../../../../shared/functions';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';


type Props = {
  user: User,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const UndeletableUser: FC<Props> = ({user, open, setOpen}) => {
  const { t } = useTranslation();
  const userFullName = `${user.firstName} ${user.lastName}`;

  return (
    <Dialog
      fullWidth maxWidth="sm"
      open={open} onClose={() => setOpen(false)}
    >
      <DialogTitle>{t('users.delete.title', {user: userFullName})}</DialogTitle>

      <DialogContent sx={{mb: 2}}>
        <strong>{t('users.delete.undeletable', {user: userFullName})}</strong>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton color="error" variant="contained" disabled>
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


const DeletableUser: FC<Props> = ({user, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteInAD, setDeleteInAD] = useState(false);
  const userFullName = `${user.firstName} ${user.lastName}`;


  const handleDeleteUser = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const deletedUser = await dispatch(deleteUser({user, deleteInAD})).unwrap();

      // Update campus list with removed campus manager for concerned campus
      if (deletedUser.role === UserRoles.CampusManager) {
        await dispatch(getCampus());
      }

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
    if (open) {
      setUserName('');
      setDeleteInAD(false);
    }
  }, [open]);


  return (
    <Dialog
      fullWidth maxWidth="sm"
      components={{Root: 'form'}}
      open={open} onSubmit={handleDeleteUser}
      onClose={() => loading ? null : setOpen(false)}
    >
      <DialogTitle>{t('users.delete.title', {user: userFullName})}</DialogTitle>

      <DialogContent>
        <p>{t('users.delete.text')}</p>

        <TextField
          required autoFocus sx={{my: 1}}
          margin="dense" variant="standard"
          onChange={e => setUserName(e.target.value)}
          label={t('users.delete.name')} value={userName}
        />

        <FormGroup>
          <FormControlLabel
            label={t('users.delete.azure')} disabled={loading}
            control={<Checkbox checked={deleteInAD} onChange={e => setDeleteInAD(e.target.checked)}/>}
          />
        </FormGroup>
      </DialogContent>

      <DialogActions>
        <Button color="primary" disabled={loading} onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" color="error" variant="contained"
          loading={loading} disabled={userName !== userFullName}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


const DeleteUser: FC<Props> = ({user: selectedUser, open, setOpen}) => {
  const { user } = useAppSelector(getLoggedInAuthState);

  return (
    user.id === selectedUser.id || userHasHigherRole(user, selectedUser.role, true) ? (
      <UndeletableUser user={selectedUser} open={open} setOpen={setOpen}/>
    ) : (
      <DeletableUser user={selectedUser} open={open} setOpen={setOpen}/>
    )
  );
};


export default DeleteUser;
