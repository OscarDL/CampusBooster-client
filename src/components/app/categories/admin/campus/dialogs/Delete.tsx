import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { Campus } from '../../../../../../shared/types/campus';
import { useAppDispatch } from '../../../../../../store/store';
// import { deleteCampus } from '../../../../../../store/features/users/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';


type Props = {
  campus: Campus,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const DeleteCampus: FC<Props> = ({campus, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);


  const handleDeleteCampus = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // await dispatch(deleteCampus(campus.id)).unwrap();

      setName('');
      setOpen(false);
      toast.success(t('admin.campus.delete.success', {campus: campus.name}));
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
      components={{Root: 'form'}}
      onSubmit={handleDeleteCampus}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('admin.campus.delete.title', {campus: campus.name})}</DialogTitle>

      <DialogContent>
        <p>{t('admin.campus.delete.text')}</p>

        <TextField
          required autoFocus
          margin="dense" variant="standard"
          label={t('admin.campus.delete.name')}
          onChange={e => setName(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" color="error" variant="contained"
          loading={loading} disabled={name !== campus.name}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default DeleteCampus;
