import copy from 'fast-copy';
import { toast } from 'react-toastify';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../store/store';
import { updateAbsence } from '../../../../../store/features/absences/slice';
import { Absence, AbsencePeriod, AbsenceRequest } from '../../../../../shared/types/absence';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';
import AbsenceUserPicker from './pickers/UserPicker';
import AbsencePlanningPicker from './pickers/PlanningPicker';


type Props = {
  open: boolean,
  absence: Absence,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const UpdateAbsence: FC<Props> = ({open, absence, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [newAbsence, setNewAbsence] = useState(copy(absence));
  const userFullName = `${absence.User.firstName} ${absence.User.lastName}`;


  const handleChangeLateMissing = (e: SelectChangeEvent<'late' | 'missing'>) => {
    const type = e.target.value as 'late' | 'missing';
    setNewAbsence({...newAbsence, late: type === 'late'});
  };

  const handleChangePeriod = (e: SelectChangeEvent<AbsencePeriod>) => {
    const period = e.target.value as AbsencePeriod;
    setNewAbsence({...newAbsence, period});
  };

  const handleUpdateAbsence = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    const jsonData = JSON.stringify({
      late: newAbsence.late,
      period: newAbsence.period,
      reason: newAbsence.reason,
      userId: newAbsence.userId,
      planningId: newAbsence.planningId,
    } as AbsenceRequest);

    const absenceData = new FormData();
    absenceData.append('data', jsonData);

    try {
      await dispatch(updateAbsence({id: absence.id, absenceData})).unwrap();

      setOpen(false);
      toast.success(t('absences.update.success', {user: userFullName}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setNewAbsence(copy(absence));
  }, [open, absence]);


  return (
    <Dialog
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      onSubmit={handleUpdateAbsence}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('absences.update.title', {user: userFullName})}</DialogTitle>

      <DialogContent>
        <Box sx={{mb: 2}}>
          <AbsenceUserPicker absence={newAbsence} setAbsence={setNewAbsence}/>
        </Box>

        <Box sx={{mb: 2}}>
          <AbsencePlanningPicker absence={newAbsence} setAbsence={setNewAbsence}/>
        </Box>

        <FormControl sx={{mb: 2}}>
          <InputLabel id="absence-select-category">{t('absences.fields.type.title')}</InputLabel>
          <Select
            size="small"
            onChange={handleChangeLateMissing}
            value={newAbsence.late ? 'late' : 'missing'}
            labelId="absence-select-type" label={t('absences.fields.type.title')}
          >
            <MenuItem value="missing">{t(`absences.fields.type.missing`)}</MenuItem>
            <MenuItem value="late">{t(`absences.fields.type.late`)}</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{mb: 2}}>
          <InputLabel id="absence-select-period">{t('absences.fields.period.title')}</InputLabel>
          <Select
            size="small"
            value={absence.period}
            onChange={handleChangePeriod}
            labelId="absence-select-period" label={t('absences.fields.period.title')}
          >
            {Object.values(AbsencePeriod).map(period => (
              <MenuItem key={period} value={period}>
                {t('absences.fields.period.' + period.toLowerCase())}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box className="MuiDialogContent-row">
          <TextField
            required multiline
            name="cb-absence-reason"
            value={newAbsence.reason}
            label={t('absences.fields.reason')}
            onChange={e => setNewAbsence({...newAbsence, reason: e.target.value})}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={isEqual(absence, newAbsence) || !newAbsence.reason}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdateAbsence;
