import dayjs from 'dayjs';
import copy from 'fast-copy';
import { toast } from 'react-toastify';
import isEqual from 'react-fast-compare';
import { Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, styled, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { Contract, ContractType } from '../../../../../shared/types/contract';
import { updateContract } from '../../../../../store/features/contracts/slice';
import { allowedFileTypes, maxDocumentSize } from '../../../../../shared/utils/values';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import ContractStudentPicker from './pickers/StudentPicker';
import ContractSupervisorPicker from './pickers/SupervisorPicker';


type Props = {
  open: boolean,
  contract: Contract,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const Input = styled('input')({display: 'none'});


const UpdateContract: FC<Props> = ({contract, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { contractsList } = useAppSelector(state => state.contracts);

  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);
  const [newContract, setNewContract] = useState(copy(contract));
  const userFullName = `${contract.User.firstName} ${contract.User.lastName}`;


  const formIsComplete = () => (
    newContract.startDate &&
    newContract.endDate &&
    newContract.userId &&
    newContract.supervisorId &&
    newContract.company &&
    newContract.email &&
    newContract.phone &&
    newContract.mission
  );

  const handleAddDocuments = (e: React.FormEvent<HTMLInputElement>) => {
    const result = e.target as HTMLInputElement;

    if (result.files) {
      const files = Array.from(result.files);

      if (files.length > 5) {
        toast.error(t('contracts.create.max_documents', {count: 5}));
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

  const handleUpdateContract = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    const contractData = new FormData();
    contractData.append('type', newContract.type);
    contractData.append('email', newContract.email);
    contractData.append('phone', newContract.phone);
    contractData.append('address', newContract.address);
    contractData.append('company', newContract.company);
    contractData.append('mission', newContract.mission);
    contractData.append('endDate', newContract.endDate);
    contractData.append('startDate', newContract.startDate);
    contractData.append('userId', String(newContract.userId));
    contractData.append('supervisorId', String(newContract.supervisorId));

    for (const document of documents) {
      if (documents) contractData.append('files', document);
    };

    try {
      await dispatch(updateContract({id: contract.id, contractData})).unwrap();

      setOpen(false);
      toast.success(t('contracts.update.success', {user: userFullName, company: contract.company}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    if (open) setNewContract(copy(contract));
  }, [contract, open]);


  return (
    <Dialog
      fullWidth maxWidth="sm"
      components={{Root: 'form'}}
      open={open} onSubmit={handleUpdateContract}
      onClose={() => loading ? null : setOpen(false)}
    >
      <DialogTitle>{t('contracts.update.title', {user: userFullName})}</DialogTitle>

      <DialogContent>
        <FormControl sx={{mb: 2}}>
          <InputLabel id="contract-select-type">{t('contracts.fields.type.title')}</InputLabel>
          <Select
            size="small" value={newContract.type}
            labelId="contract-select-type" label={t('contracts.fields.type.title')}
            onChange={e => setNewContract({...newContract, type: e.target.value as ContractType})}
          >
            {Object.values(ContractType).map(type => (
              <MenuItem key={type} value={type}>
                {t(`contracts.fields.type.${type.toLowerCase()}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{mb: 2}}>
          <ContractStudentPicker contract={newContract} setContract={setNewContract}/>
        </Box>

        <Box sx={{mb: 2}}>
          <ContractSupervisorPicker contract={newContract} setContract={setNewContract}/>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="MuiDialogContent-row">
            <DatePicker
              label={t('contracts.fields.start_date')}
              value={newContract.startDate ? dayjs(newContract.startDate) : null}
              renderInput={(params) => <TextField {...params} required variant="standard" InputLabelProps={{shrink: true}}/>}
              onChange={date => setNewContract({...newContract, startDate: date?.isValid() ? dayjs(date).toISOString() : ''})}
            />
            <DatePicker
              label={t('contracts.fields.end_date')}
              value={newContract.endDate ? dayjs(newContract.endDate) : null}
              renderInput={(params) => <TextField {...params} required variant="standard" InputLabelProps={{shrink: true}}/>}
              onChange={date => setNewContract({...newContract, endDate: date?.isValid() ? dayjs(date).toISOString() : ''})}
            />
          </Box>
        </LocalizationProvider>

        <Box className="MuiDialogContent-row" sx={{mt: 2}}>
          <TextField
            variant="standard"
            name="cb-contract-company"
            value={newContract.company}
            label={t('contracts.fields.company')}
            onChange={e => setNewContract({...newContract, company: e.target.value})}
          />
          <TextField
            variant="standard"
            name="cb-contract-address"
            value={newContract.address}
            label={t('contracts.fields.address')}
            onChange={e => setNewContract({...newContract, address: e.target.value})}
          />
        </Box>

        <Box className="MuiDialogContent-row" sx={{mt: 2, mb: 3}}>
          <TextField
            variant="standard"
            name="cb-contract-email"
            value={newContract.email}
            label={t('contracts.fields.email')}
            onChange={e => setNewContract({...newContract, email: e.target.value})}
          />
          <TextField
            variant="standard"
            name="cb-contract-phone"
            value={newContract.phone}
            label={t('contracts.fields.phone')}
            onChange={e => setNewContract({...newContract, phone: e.target.value})}
          />
        </Box>

        <TextField
          multiline fullWidth
          name="cb-contract-mission"
          value={newContract.mission}
          label={t('contracts.fields.mission')}
          onChange={e => setNewContract({...newContract, mission: e.target.value})}
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
          type="submit" variant="contained" loading={loading}
          disabled={!contractsList || isEqual(contract, newContract) || !formIsComplete()}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdateContract;
