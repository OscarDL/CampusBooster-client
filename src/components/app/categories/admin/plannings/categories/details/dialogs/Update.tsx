import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../../../../store/store';
import { Classroom } from '../../../../../../../../shared/types/classroom';
import { updatePlanningEntry } from '../../../../../../../../store/features/plannings/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../../../shared/dialog';
import { Planning, PlanningPeriod, PlanningRequest, PlanningRequestType } from '../../../../../../../../shared/types/planning';

import PlanningCoursePicker from './CoursePicker';
import PlanningClassroomPicker from '../../ClassroomPicker';


type Props = {
  open: boolean,
  planning: Planning,
  classroom: Classroom | undefined,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newPlanningRequest = (planning: Planning): PlanningRequest => ({
  id: planning.id,classroomHasCourseId: planning.classroomHasCourseId,
  type: planning.type as unknown as PlanningRequestType, period: planning.period,
  cancelled: planning.cancelled, remote: planning.remote, date: dayjs(planning.date).toISOString()
});


const UpdatePlanningEntry: FC<Props> = ({classroom, planning, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [newPlanningEntry, setNewPlanningEntry] = useState(newPlanningRequest(planning));


  const handleUpdatePlanningEntry = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(updatePlanningEntry(newPlanningEntry)).unwrap();

      setOpen(false);
      toast.success(t('admin.plannings.update.success'));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    if (open) setNewPlanningEntry(newPlanningRequest(planning));
  }, [open, planning]);


  return (
    <Dialog
      fullWidth maxWidth="sm"
      components={{Root: 'form'}}
      onClose={() => loading ? null : setOpen(false)}
      open={open} onSubmit={handleUpdatePlanningEntry}
    >
      <DialogTitle>{t('admin.plannings.update.title')}</DialogTitle>

      <DialogContent>
        <Box sx={{mb: 2}}>
          <PlanningClassroomPicker disabled classroom={classroom}/>
        </Box>

        <Box sx={{mb: 2}}>
          <PlanningCoursePicker
            classroom={classroom}
            planningEntry={newPlanningEntry}
            setPlanningEntry={setNewPlanningEntry}
          />
        </Box>

        <FormControl sx={{mb: 2}}>
          <InputLabel id="planning-select-type">{t('admin.plannings.fields.type.title')}</InputLabel>
          <Select
            size="small" value={newPlanningEntry.type}
            labelId="planning-select-type" label={t('admin.plannings.fields.type.title')}
            onChange={e => setNewPlanningEntry({...newPlanningEntry, type: e.target.value as PlanningRequestType})}
          >
            {Object.values(PlanningRequestType).map(type => (
              <MenuItem key={type} value={type}>
                {t(`admin.plannings.fields.type.${type.toLowerCase()}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{mb: 2}}>
          <InputLabel id="planning-select-period">{t('admin.plannings.fields.period.title')}</InputLabel>
          <Select
            size="small" value={newPlanningEntry.period}
            labelId="planning-select-period" label={t('admin.plannings.fields.period.title')}
            onChange={e => setNewPlanningEntry({...newPlanningEntry, period: e.target.value as PlanningPeriod})}
          >
            {Object.values(PlanningPeriod).map(period => (
              <MenuItem key={period} value={period}>
                {t(`admin.plannings.fields.period.${period.toLowerCase()}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={t('admin.plannings.fields.date')}
            value={newPlanningEntry.date ? dayjs(newPlanningEntry.date) : null}
            renderInput={(params) => <TextField {...params} fullWidth variant="standard" InputLabelProps={{shrink: true}}/>}
            onChange={date => setNewPlanningEntry({...newPlanningEntry, date: date?.isValid() ? dayjs(date).toISOString() : ''})}
          />
        </LocalizationProvider>

        <Box className="MuiDialogContent-row" sx={{mt: 2}}>
          <FormGroup sx={{alignItems: 'center'}}>
            <FormControlLabel
              label={t('admin.plannings.fields.remote')}
              control={<Checkbox
                checked={newPlanningEntry.remote}
                onChange={e => setNewPlanningEntry({...newPlanningEntry, remote: e.target.checked})}
              />}
            />
          </FormGroup>

          <FormGroup sx={{alignItems: 'center'}}>
            <FormControlLabel
              label={t('admin.plannings.fields.cancelled')}
              control={<Checkbox
                checked={newPlanningEntry.cancelled}
                onChange={e => setNewPlanningEntry({...newPlanningEntry, cancelled: e.target.checked})}
              />}
            />
          </FormGroup>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="error" disabled={loading} onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          disabled={!newPlanningEntry.classroomHasCourseId}
          type="submit" variant="contained" loading={loading}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdatePlanningEntry;
