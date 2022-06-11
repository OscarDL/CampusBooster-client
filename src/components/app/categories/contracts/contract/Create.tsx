import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { createContract } from '../../../../../store/features/contracts/slice';
import { ContractRequest, ContractType } from '../../../../../shared/types/contract';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import ContractStudentPicker from './pickers/StudentPicker';
import ContractSupervisorPicker from './pickers/SupervisorPicker';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const newContractRequest = (): ContractRequest => ({
  company: '', email: '', phone: '', address: '', url: '', mission: '',
  startDate: dayjs().toISOString(), endDate: dayjs().toISOString(),
  type: ContractType.FullTimeInternship, userId: 0, supervisorId: 0
});


const CreateContract: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { usersList } = useAppSelector(state => state.users);
  const { contractsList } = useAppSelector(state => state.contracts);

  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(newContractRequest());


  const formIsComplete = () => (
    contract.startDate &&
    contract.endDate &&
    contract.userId &&
    contract.supervisorId &&
    contract.company &&
    contract.url &&
    contract.email &&
    contract.phone &&
    contract.address &&
    contract.mission
  );

  const handleCreateContract = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(createContract(contract)).unwrap();

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
      components={{Root: 'form'}}
      onSubmit={handleCreateContract}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
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
            value={contract.url}
            name="cb-contract-url"
            label={t('contracts.fields.url')}
            onChange={e => setContract({...contract, url: e.target.value})}
          />
        </Box>

        <Box className="MuiDialogContent-row" sx={{mt: 2}}>
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

        <Box className="MuiDialogContent-row" sx={{mt: 2, mb: 3}}>
          <TextField
            fullWidth
            variant="standard"
            value={contract.address}
            name="cb-contract-address"
            label={t('contracts.fields.address')}
            onChange={e => setContract({...contract, address: e.target.value})}
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
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
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
