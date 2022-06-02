import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { createBalance } from '../../../../../store/features/accounting/slice';
import { BalanceRequest, BalanceStatus } from '../../../../../shared/types/accounting';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import BalanceUserPicker from './UserPicker';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newBalanceRequest = (): BalanceRequest => ({
  userId: 0, debit: 0, credit: 0, description: '', status: BalanceStatus.Pending,
  dateRequested: dayjs().toISOString(), dateConfirmed: undefined
});


const CreateBalance: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { balances } = useAppSelector(state => state.accounting);

  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<BalanceRequest>(newBalanceRequest());


  const handleChangeCreditDebit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'credit' | 'debit') => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setBalance({...balance, [type]: value});
  };

  const handleCreateBalance = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(createBalance(balance)).unwrap();

      setOpen(false);
      setBalance(newBalanceRequest());
      toast.success(t('accounting.create.success'));
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
      onSubmit={handleCreateBalance}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('accounting.create.title')}</DialogTitle>

      <DialogContent>
        <BalanceUserPicker balance={balance} setBalance={setBalance}/>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="MuiDialogContent-row" sx={{mt: 2}}>
            <DatePicker
              label={t('accounting.create.date_requested')}
              value={balance.dateRequested ? dayjs(balance.dateRequested) : null}
              onChange={date => setBalance({...balance, dateRequested: date?.isValid() ? dayjs(date).toISOString() : ''})}
              renderInput={(params) => <TextField {...params} required variant="standard" InputLabelProps={{shrink: true}}/>}
            />
            <DatePicker
              label={t('accounting.create.date_confirmed')}
              value={balance.dateConfirmed ? dayjs(balance.dateConfirmed) : null}
              renderInput={(params) => <TextField {...params} variant="standard" InputLabelProps={{shrink: true}}/>}
              onChange={date => setBalance({...balance, dateConfirmed: date?.isValid() ? dayjs(date).toISOString() : ''})}
            />
          </Box>
        </LocalizationProvider>

        <Box className="MuiDialogContent-row" sx={{mt: 1}}>
          <TextField
            required
            type="number"
            variant="standard"
            name="cb-balance-credit"
            value={balance.credit ?? ''}
            label={t('accounting.create.credit')}
            onChange={e => handleChangeCreditDebit(e, 'credit')}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
          />
          <TextField
            required
            type="number"
            variant="standard"
            name="cb-balance-debit"
            value={balance.debit ?? ''}
            label={t('accounting.create.debit')}
            onChange={e => handleChangeCreditDebit(e, 'debit')}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
          />
        </Box>

        <FormControl sx={{mt: 2}}>
          <InputLabel id="balance-select-status">{t('accounting.status.title')}</InputLabel>
          <Select
            size="small" value={balance.status}
            labelId="balance-select-status" label={t('accounting.status.title')}
            onChange={e => setBalance({...balance, status: e.target.value as BalanceStatus})}
          >
            {Object.keys(BalanceStatus).map(status => (
              <MenuItem key={status} value={status}>
                {t('accounting.status.' + status)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          required fullWidth multiline
          sx={{mb: 2}} margin="normal"
          name="cb-balance-description"
          value={balance.description ?? ''}
          label={t('accounting.create.description')}
          onChange={e => setBalance({...balance, description: e.target.value})}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!balances || !(balance.description && balance.userId)}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateBalance;
