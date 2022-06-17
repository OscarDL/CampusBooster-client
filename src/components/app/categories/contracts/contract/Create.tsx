import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, styled, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { createContract } from '../../../../../store/features/contracts/slice';
import { ContractRequest, ContractType } from '../../../../../shared/types/contract';
import { allowedFileTypes, maxDocumentSize, maxNumberOfDocuments } from '../../../../../shared/utils/values';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import ContractStudentPicker from './pickers/StudentPicker';
import ContractSupervisorPicker from './pickers/SupervisorPicker';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newContractRequest = (): ContractRequest => ({
  company: '', email: '', phone: '', address: '', mission: '',
  startDate: dayjs().toISOString(), endDate: dayjs().toISOString(),
  type: ContractType.FullTimeInternship, userId: 0, supervisorId: 0
});

const Input = styled('input')({display: 'none'});


const CreateContract: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { usersList } = useAppSelector(state => state.users);
  const { contractsList } = useAppSelector(state => state.contracts);

  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);
  const [contract, setContract] = useState(newContractRequest());


  const formIsComplete = () => (
    contract.startDate &&
    contract.endDate &&
    contract.userId &&
    contract.supervisorId &&
    contract.company &&
    contract.email &&
    contract.phone &&
    contract.mission
  );

  const handleAddDocuments = (e: React.FormEvent<HTMLInputElement>) => {
    const result = e.target as HTMLInputElement;

    if (result.files) {
      const files = Array.from(result.files);

      if (files.length > maxNumberOfDocuments) {
        toast.error(t('contracts.create.max_documents', {count: maxNumberOfDocuments}));
        return;
      }

      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxDocumentSize) {
          toast.error(t(`contracts.file_too_large`, {file: i, size: maxDocumentSize/1024/1024})); // bytes to megabytes
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

  const handleCreateContract = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    const contractData = new FormData();
    contractData.append('type', contract.type);
    contractData.append('email', contract.email);
    contractData.append('phone', contract.phone);
    contractData.append('address', contract.address);
    contractData.append('company', contract.company);
    contractData.append('mission', contract.mission);
    contractData.append('endDate', contract.endDate);
    contractData.append('startDate', contract.startDate);
    contractData.append('userId', String(contract.userId));
    contractData.append('supervisorId', String(contract.supervisorId));

    for (const document of documents) {
      if (documents) contractData.append('files', document);
    };

    try {
      await dispatch(createContract(contractData)).unwrap();

      setOpen(false);
      setContract(newContractRequest());

      const user = usersList?.find(user => user.id === contract.userId);
      toast.success(t('contracts.create.success', {user: `${user?.firstName} ${user?.lastName}`, company: contract.company}));
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
      open={open} onSubmit={handleCreateContract}
      onClose={() => loading ? null : setOpen(false)}
    >
      <DialogTitle>{t('contracts.create.title')}</DialogTitle>

      <DialogContent>
        <FormControl sx={{mb: 2}}>
          <InputLabel id="contract-select-type">{t('contracts.fields.type.title')}</InputLabel>
          <Select
            size="small" value={contract.type}
            labelId="contract-select-type" label={t('contracts.fields.type.title')}
            onChange={e => setContract({...contract, type: e.target.value as ContractType})}
          >
            {Object.values(ContractType).map(type => (
              <MenuItem key={type} value={type}>
                {t(`contracts.fields.type.${type.toLowerCase()}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{mb: 2}}>
          <ContractStudentPicker contract={contract} setContract={setContract}/>
        </Box>

        <Box sx={{mb: 2}}>
          <ContractSupervisorPicker contract={contract} setContract={setContract}/>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="MuiDialogContent-row">
            <DatePicker
              label={t('contracts.fields.start_date')}
              value={contract.startDate ? dayjs(contract.startDate) : null}
              onChange={date => setContract({...contract, startDate: date?.isValid() ? dayjs(date).toISOString() : ''})}
              renderInput={(params) => <TextField {...params} required variant="standard" InputLabelProps={{shrink: true}}/>}
            />
            <DatePicker
              label={t('contracts.fields.end_date')}
              value={contract.endDate ? dayjs(contract.endDate) : null}
              onChange={date => setContract({...contract, endDate: date?.isValid() ? dayjs(date).toISOString() : ''})}
              renderInput={(params) => <TextField {...params} required variant="standard" InputLabelProps={{shrink: true}}/>}
            />
          </Box>
        </LocalizationProvider>

        <Box className="MuiDialogContent-row" sx={{mt: 2}}>
          <TextField
            required
            variant="standard"
            value={contract.company}
            name="cb-contract-company"
            label={t('contracts.fields.company')}
            onChange={e => setContract({...contract, company: e.target.value})}
          />
          <TextField
            variant="standard"
            value={contract.address}
            name="cb-contract-address"
            label={t('contracts.fields.address')}
            onChange={e => setContract({...contract, address: e.target.value})}
          />
        </Box>

        <Box className="MuiDialogContent-row" sx={{mt: 2, mb: 3}}>
          <TextField
            required
            variant="standard"
            value={contract.email}
            name="cb-contract-email"
            label={t('contracts.fields.email')}
            onChange={e => setContract({...contract, email: e.target.value})}
          />
          <TextField
            required
            variant="standard"
            value={contract.phone}
            name="cb-contract-phone"
            label={t('contracts.fields.phone')}
            onChange={e => setContract({...contract, phone: e.target.value})}
          />
        </Box>

        <TextField
          required
          multiline fullWidth
          value={contract.mission}
          name="cb-contract-mission"
          label={t('contracts.fields.mission')}
          onChange={e => setContract({...contract, mission: e.target.value})}
        />

        <Box sx={{mt: 2, display: 'grid', gap: '10px'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <label htmlFor="file-btn">
              <Input
                disabled={loading}
                onInput={handleAddDocuments}
                multiple type="file" id="file-btn"
                accept={allowedFileTypes.contracts.join(', ')}
              />
              <Button variant="contained" component="span">
                {t('contracts.fields.documents')}
              </Button>
            </label>

            <IconButton
              color="error"
              sx={{p: '6px', ml: 2}}
              onClick={handleRemoveDocuments}
              disabled={loading || documents.length === 0}
            >
              <Close/>
            </IconButton>
          </Box>

          <p className="text-overflow">
            {documents.length ? (
              t('contracts.fields.files_selected', {count: documents.length})
            ) : (
              t('contracts.fields.no_files_selected')
            )}
          </p>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="error" disabled={loading} onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          disabled={!contractsList || !formIsComplete()}
          type="submit" variant="contained" loading={loading}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateContract;
