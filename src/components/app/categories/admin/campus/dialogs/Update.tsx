import copy from 'fast-copy';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';

import { Campus } from '../../../../../../shared/types/campus';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
// import { updateCampus } from '../../../../../../store/features/users/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';

import CampusManagerPicker from './CampusManagerPicker';


type Props = {
  campus: Campus,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const UpdateCampus: FC<Props> = ({campus, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { campusList } = useAppSelector(state => state.users);

  const [loading, setLoading] = useState(false);
  const [newCampus, setNewCampus] = useState(copy(campus));


  const handleUpdateCampus = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      //await dispatch(updateCampus(campus)).unwrap();

      setOpen(false);
      toast.success(t('admin.campus.update.success', {campus: campus.name}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setNewCampus(copy(campus));
  }, [campus, open]);


  return (
    <Dialog
      components={{Root: 'form'}}
      onSubmit={handleUpdateCampus}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('admin.campus.update.title', {campus: campus.name})}</DialogTitle>

      <DialogContent>
        <CampusManagerPicker campus={newCampus} setCampus={setNewCampus}/>

        <TextField
          required
          margin="dense"
          variant="standard"
          name="cb-campus-name"
          value={newCampus.name}
          label={t('admin.campus.fields.name')}
          onChange={e => setNewCampus({...newCampus, name: e.target.value})}
        />

        <TextField
          required
          margin="dense"
          variant="standard"
          name="cb-campus-address"
          value={newCampus.address}
          label={t('admin.campus.fields.address')}
          onChange={e => setNewCampus({...newCampus, address: e.target.value})}
        />

        <Box className="MuiDialogContent-row">
          <TextField
            required
            margin="dense"
            variant="standard"
            name="cb-campus-post-code"
            value={newCampus.postCode}
            label={t('admin.campus.fields.post_code')}
            onChange={e => setNewCampus({...newCampus, postCode: e.target.value})}
          />
          <TextField
            required
            margin="dense"
            variant="standard"
            name="cb-campus-city"
            value={newCampus.city}
            label={t('admin.campus.fields.city')}
            onChange={e => setNewCampus({...newCampus, city: e.target.value})}
          />
        </Box>

        <Box className="MuiDialogContent-row" sx={{mt: 2}}>
          <FormGroup>
            <FormControlLabel
              label={t('admin.campus.fields.open')}
              control={<Checkbox
                checked={newCampus.open}
                onChange={e => setNewCampus({...newCampus, open: e.target.checked})}
              />}
            />
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              label={t('admin.campus.fields.virtual')}
              control={<Checkbox
                checked={newCampus.virtual}
                onChange={e => setNewCampus({...newCampus, virtual: e.target.checked})}
              />}
            />
          </FormGroup>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!campusList || !(newCampus.name && newCampus.address && newCampus.city)}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdateCampus;
