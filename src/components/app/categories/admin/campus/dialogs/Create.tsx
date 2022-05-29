import { toast } from 'react-toastify';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';

import { CampusRequest } from '../../../../../../shared/types/campus';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
// import { createCampus } from '../../../../../../store/features/campus/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';

import CampusManagerPicker from './CampusManagerPicker';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newCampusRequest = (): CampusRequest => ({
  name: '', address: '', postCode: '', city: '',
  open: true, virtual: false, campusManagerId: 0
});


const CreateCampus: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { campusList } = useAppSelector(state => state.campus);

  const [loading, setLoading] = useState(false);
  const [campus, setCampus] = useState(newCampusRequest());


  const formIsComplete = () => {
    if (!campus.virtual) return campus.name && campus.address && campus.city && campus.campusManagerId;
    return campus.name && campus.campusManagerId;
  };

  const handleCreateCampus = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      //await dispatch(createCampus(campus)).unwrap();

      setOpen(false);
      setCampus(newCampusRequest());
      toast.success(t('admin.campus.create.success', {campus: campus.name}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  return (
    <Dialog
      components={{Root: 'form'}}
      onSubmit={handleCreateCampus}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('admin.campus.create.title')}</DialogTitle>

      <DialogContent>
        <CampusManagerPicker campus={campus} setCampus={setCampus}/>

        <TextField
          required
          autoFocus
          margin="dense"
          variant="standard"
          value={campus.name}
          name="cb-campus-name"
          label={t('admin.campus.fields.name')}
          onChange={e => setCampus({...campus, name: e.target.value})}
        />

        <TextField
          margin="dense"
          variant="standard"
          value={campus.address}
          name="cb-campus-address"
          required={!campus.virtual}
          label={t('admin.campus.fields.address')}
          onChange={e => setCampus({...campus, address: e.target.value})}
        />

        <Box className="MuiDialogContent-row">
          <TextField
            margin="dense"
            variant="standard"
            value={campus.postCode}
            name="cb-campus-post-code"
            required={!campus.virtual}
            label={t('admin.campus.fields.post_code')}
            onChange={e => setCampus({...campus, postCode: e.target.value})}
          />
          <TextField
            margin="dense"
            variant="standard"
            value={campus.city}
            name="cb-campus-city"
            required={!campus.virtual}
            label={t('admin.campus.fields.city')}
            onChange={e => setCampus({...campus, city: e.target.value})}
          />
        </Box>

        <Box className="MuiDialogContent-row" sx={{mt: 2}}>
          <FormGroup>
            <FormControlLabel
              label={t('admin.campus.fields.open')}
              control={<Checkbox
                checked={campus.open}
                onChange={e => setCampus({...campus, open: e.target.checked})}
              />}
            />
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              label={t('admin.campus.fields.virtual')}
              control={<Checkbox
                checked={campus.virtual}
                onChange={e => setCampus({...campus, virtual: e.target.checked})}
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
          disabled={!campusList || !formIsComplete()}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateCampus;
