import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { User } from '../../../../../../shared/types/user';
import { useAppDispatch } from '../../../../../../store/store';
import { updateBannedUser } from '../../../../../../store/features/users/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';


type Props = {
  user: User,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const RemoveBan: FC<Props> = ({user, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);


  const handleRemoveBan = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(updateBannedUser({id: user.id, banned: false})).unwrap();

      setOpen(false);
      toast.success(t('admin.banned_users.remove.success', {user: `${user.firstName} ${user.lastName}`}));
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
      onSubmit={handleRemoveBan}
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('admin.banned_users.remove.title', {user: `${user.firstName} ${user.lastName}`})}</DialogTitle>

      <DialogContent>
        <p>{t('admin.banned_users.remove.text')}</p>

        <TextField
          required autoFocus
          margin="dense" variant="standard"
          onChange={e => setName(e.target.value)}
          label={t('admin.banned_users.remove.full_name')}
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" color="error" variant="contained"
          loading={loading} disabled={name !== `${user.firstName} ${user.lastName}`}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default RemoveBan;
