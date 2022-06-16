import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '../../../../../../shared/types/user';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { updateBannedUser } from '../../../../../../store/features/users/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';

import UserPicker from './UserPicker';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const AddBan: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { usersList } = useAppSelector(state => state.users);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);


  const handleBanUser = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {id, firstName, lastName} = user!;
      await dispatch(updateBannedUser({id, banned: true})).unwrap();

      setOpen(false);
      toast.success(t('admin.banned_users.add.success', {user: `${firstName} ${lastName}`}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  return (
    <Dialog
      fullWidth maxWidth="sm"
      components={{Root: 'form'}}
      open={open} onSubmit={handleBanUser}
      onClose={() => loading ? null : setOpen(false)}
    >
      <DialogTitle>{t('admin.banned_users.add.title')}</DialogTitle>

      <DialogContent>
        <UserPicker user={user} setUser={setUser}/>
      </DialogContent>

      <DialogActions>
        <Button color="error" disabled={loading} onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          disabled={!usersList || !user}
          type="submit" variant="contained" loading={loading}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default AddBan;
