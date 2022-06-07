import dayjs from 'dayjs';
import copy from 'fast-copy';
import { toast } from 'react-toastify';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { Contract, ContractType } from '../../../../../shared/types/contract';
import { updateContract } from '../../../../../store/features/contracts/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import ContractStudentPicker from './pickers/StudentPicker';
import ContractSupervisorPicker from './pickers/SupervisorPicker';


type Props = {
  open: boolean,
  contract: Contract,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const UpdateContract: FC<Props> = ({contract, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { contractsList } = useAppSelector(state => state.contracts);

  const [loading, setLoading] = useState(false);
  const [newContract, setNewContract] = useState(copy(contract));
  const userFullName = `${contract.User.firstName} ${contract.User.lastName}`;


  const formIsComplete = () => (
    newContract.startDate &&
    newContract.endDate &&
    newContract.userId &&
    newContract.supervisorId &&
    newContract.company &&
    newContract.url &&
    newContract.email &&
    newContract.phone &&
    newContract.address &&
    newContract.mission
  );

  const handleUpdateContract = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(updateContract(newContract)).unwrap();

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
      components={{Root: 'form'}}
      onSubmit={handleUpdateContract}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
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
            name="cb-contract-url"
            value={newContract.url}
            label={t('contracts.fields.url')}
            onChange={e => setNewContract({...newContract, url: e.target.value})}
          />
        </Box>

        <Box className="MuiDialogContent-row" sx={{mt: 2}}>
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

        <Box className="MuiDialogContent-row" sx={{mt: 2, mb: 3}}>
          <TextField
            fullWidth
            variant="standard"
            name="cb-contract-address"
            value={newContract.address}
            label={t('contracts.fields.address')}
            onChange={e => setNewContract({...newContract, address: e.target.value})}
          />
        </Box>

        <TextField
          multiline fullWidth
          name="cb-contract-mission"
          value={newContract.mission}
          label={t('contracts.fields.mission')}
          onChange={e => setNewContract({...newContract, mission: e.target.value})}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
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
