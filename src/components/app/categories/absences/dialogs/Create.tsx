import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, styled, TextField } from '@mui/material';

import { User, UserRoles } from '../../../../../shared/types/user';
import { getLoggedInAuthState } from '../../../../../shared/functions';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { createAbsence } from '../../../../../store/features/absences/slice';
import { AbsencePeriod, AbsenceRequest } from '../../../../../shared/types/absence';
import { allowedFileTypes, maxDocumentSize } from '../../../../../shared/utils/values';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import AbsenceUserPicker from './pickers/UserPicker';
import AbsencePlanningPicker from './pickers/PlanningPicker';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newAbsenceRequest = (user: User): AbsenceRequest => ({
  late: false, period: AbsencePeriod.FullDay, reason: '',
  userId: user.role === UserRoles.Student ? user.id : 0, planningId: 0
});

const Input = styled('input')({display: 'none'});


const CreateAbsence: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);

  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);
  const [absence, setAbsence] = useState(newAbsenceRequest(user));


  const handleAddDocuments = (e: React.FormEvent<HTMLInputElement>) => {
    const result = e.target as HTMLInputElement;

    if (result.files) {
      const files = Array.from(result.files);

      if (files.length > 5) {
        toast.error(t('absences.create.max_documents', {count: 5}));
        return;
      }

      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxDocumentSize) {
          toast.error(t(`absences.file_too_large`, {file: i, size: maxDocumentSize/1024/1024})); // bytes to megabytes
          setDocuments([]);
          return;
        }
        setDocuments(documents => documents.concat(files[i]));
      }
    }
  };

  const handleRemoveDocuments = () => {
    setDocuments([]);
  };

  const handleChangeLateMissing = (e: SelectChangeEvent<'late' | 'missing'>) => {
    const type = e.target.value as 'late' | 'missing';
    setAbsence({...absence, late: type === 'late'});
  };

  const handleChangePeriod = (e: SelectChangeEvent<AbsencePeriod>) => {
    const period = e.target.value as AbsencePeriod;
    setAbsence({...absence, period});
  };

  const handleCreateAbsence = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    const absenceData = new FormData();
    absenceData.append('data', JSON.stringify(absence));

    for (const document of documents) {
      if (documents) absenceData.append('files', document);
    };

    try {
      const absence = await dispatch(createAbsence(absenceData)).unwrap();

      setOpen(false);
      toast.success(t('absences.create.success', {user: `${absence?.User?.firstName} ${absence?.User?.lastName}`}));
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
      onSubmit={handleCreateAbsence}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('absences.create.title')}</DialogTitle>

      <DialogContent>
        <Box sx={{mb: 2}}>
          <AbsenceUserPicker absence={absence} setAbsence={setAbsence}/>
        </Box>

        <Box sx={{mb: 2}}>
          <AbsencePlanningPicker absence={absence} setAbsence={setAbsence}/>
        </Box>

        <FormControl sx={{mb: 2}}>
          <InputLabel id="absence-select-type">{t('absences.fields.type.title')}</InputLabel>
          <Select
            size="small"
            onChange={handleChangeLateMissing}
            value={absence.late ? 'late' : 'missing'}
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
            value={absence.reason}
            name="cb-absence-reason"
            label={t('absences.fields.reason')}
            onChange={e => setAbsence({...absence, reason: e.target.value})}
          />
        </Box>

        <Box sx={{mt: 2, display: 'grid', gap: '10px'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <label htmlFor="file-btn">
              <Input
                onInput={handleAddDocuments}
                multiple type="file" id="file-btn"
                accept={allowedFileTypes.absences.join(', ')}
              />
              <Button variant="contained" component="span">
                {t('absences.create.documents')}
              </Button>
            </label>

            <IconButton
              color="error"
              sx={{p: '6px', ml: 2}}
              onClick={handleRemoveDocuments}
              disabled={documents.length === 0}
            >
              <Close/>
            </IconButton>
          </Box>

          <span className="text-overflow">
            {documents.length ? (
              t('absences.create.files_selected', {count: documents.length})
            ) : (
              t('absences.create.no_files_selected')
            )}
          </span>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!absence.reason || !absence.userId || !absence.planningId}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateAbsence;
