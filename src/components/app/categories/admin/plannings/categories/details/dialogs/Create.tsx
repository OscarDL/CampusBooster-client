import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../../../../store/store';
import { Classroom } from '../../../../../../../../shared/types/classroom';
import { createPlanningEntry } from '../../../../../../../../store/features/plannings/slice';
import { PlanningPeriod, PlanningRequest, PlanningRequestType } from '../../../../../../../../shared/types/planning';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../../../shared/dialog';

import PlanningCoursePicker from './CoursePicker';
import PlanningClassroomPicker from '../../ClassroomPicker';


type Props = {
  open: boolean,
  classroom: Classroom | undefined,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newPlanningRequest = (): PlanningRequest => ({
  cancelled: false, remote: false,
  type: PlanningRequestType.Course, classroomHasCourseId: 0,
  date: dayjs().toISOString(), period: PlanningPeriod.FullDay
});


const AddPlanningEntry: FC<Props> = ({classroom, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [planningEntry, setPlanningEntry] = useState(newPlanningRequest());


  const handleAddPlanningEntry = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(createPlanningEntry(planningEntry)).unwrap();

      setOpen(false);
      setPlanningEntry(newPlanningRequest());
      toast.success(t('admin.plannings.add.success'));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  return (
    <Dialog
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      onSubmit={handleAddPlanningEntry}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('admin.plannings.add.title')}</DialogTitle>

      <DialogContent>
        <Box sx={{mb: 2}}>
          <PlanningClassroomPicker disabled classroom={classroom}/>
        </Box>

        <Box sx={{mb: 2}}>
          <PlanningCoursePicker
            classroom={classroom}
            planningEntry={planningEntry}
            setPlanningEntry={setPlanningEntry}
          />
        </Box>

        <FormControl sx={{mb: 2}}>
          <InputLabel id="planning-select-type">{t('admin.plannings.fields.type.title')}</InputLabel>
          <Select
            size="small" value={planningEntry.type}
            labelId="planning-select-type" label={t('admin.plannings.fields.type.title')}
            onChange={e => setPlanningEntry({...planningEntry, type: e.target.value as PlanningRequestType})}
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
            size="small" value={planningEntry.period}
            labelId="planning-select-period" label={t('admin.plannings.fields.period.title')}
            onChange={e => setPlanningEntry({...planningEntry, period: e.target.value as PlanningPeriod})}
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
            value={planningEntry.date ? dayjs(planningEntry.date) : null}
            renderInput={(params) => <TextField {...params} fullWidth variant="standard" InputLabelProps={{shrink: true}}/>}
            onChange={date => setPlanningEntry({...planningEntry, date: date?.isValid() ? dayjs(date).toISOString() : ''})}
          />
        </LocalizationProvider>

        <Box className="MuiDialogContent-row" sx={{mt: 2}}>
          <FormGroup sx={{alignItems: 'center'}}>
            <FormControlLabel
              label={t('admin.plannings.fields.remote')}
              control={<Checkbox
                checked={planningEntry.remote}
                onChange={e => setPlanningEntry({...planningEntry, remote: e.target.checked})}
              />}
            />
          </FormGroup>

          <FormGroup sx={{alignItems: 'center'}}>
            <FormControlLabel
              label={t('admin.plannings.fields.cancelled')}
              control={<Checkbox
                checked={planningEntry.cancelled}
                onChange={e => setPlanningEntry({...planningEntry, cancelled: e.target.checked})}
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
          disabled={!planningEntry.classroomHasCourseId}
          type="submit" variant="contained" loading={loading}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default AddPlanningEntry;
