import dayjs from 'dayjs';
import copy from 'fast-copy';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../store/store';
import { updateBalance } from '../../../../../store/features/accounting/slice';
import { Balance, BalanceStatus } from '../../../../../shared/types/accounting';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import SelectBalanceUser from './UserSelect';


type Props = {
  open: boolean,
  balance: Balance,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const UpdateBalance: FC<Props> = ({balance, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [newBalance, setNewBalance] = useState(copy(balance));


  const handleChangeCreditDebit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'credit' | 'debit') => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setNewBalance({...newBalance, [type]: value});
  };

  const handleUpdateBalance = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(updateBalance(newBalance)).unwrap();

      setOpen(false);
      toast.success(t('accounting.update.success'));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setNewBalance(copy(balance));
  }, [balance, open]);


  return (
    <Dialog
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      onSubmit={handleUpdateBalance}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('accounting.update.title')}</DialogTitle>

      <DialogContent>
        <SelectBalanceUser balance={newBalance} setBalance={setNewBalance}/>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="MuiDialogContent-row" sx={{mt: 1}}>
            <DatePicker
              label={t('accounting.update.date_requested')}
              value={newBalance.dateRequested ? dayjs(newBalance.dateRequested) : null}
              renderInput={(params) => <TextField {...params} required variant="standard" InputLabelProps={{shrink: true}}/>}
              onChange={date => setNewBalance({...newBalance, dateRequested: date?.isValid() ? dayjs(date).toISOString() : ''})}
            />
            <DatePicker
              label={t('accounting.update.date_confirmed')}
              value={newBalance.dateConfirmed ? dayjs(newBalance.dateConfirmed) : null}
              renderInput={(params) => <TextField {...params} variant="standard" InputLabelProps={{shrink: true}}/>}
              onChange={date => setNewBalance({...newBalance, dateConfirmed: date?.isValid() ? dayjs(date).toISOString() : ''})}
            />
          </Box>
        </LocalizationProvider>

        <Box className="MuiDialogContent-row" sx={{mt: 1}}>
          <TextField
            required
            type="number"
            variant="standard"
            name="cb-balance-credit"
            value={newBalance.credit ?? ''}
            label={t('accounting.update.credit')}
            onChange={e => handleChangeCreditDebit(e, 'credit')}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
          />
          <TextField
            required
            type="number"
            variant="standard"
            name="cb-balance-debit"
            value={newBalance.debit ?? ''}
            label={t('accounting.update.debit')}
            onChange={e => handleChangeCreditDebit(e, 'debit')}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
          />
        </Box>

        <FormControl sx={{mt: 2}}>
          <InputLabel id="balance-select-user">{t('accounting.status.title')}</InputLabel>
          <Select
            size="small" value={newBalance.status}
            labelId="balance-select-user" label={t('accounting.status.title')}
            onChange={e => setNewBalance({...newBalance, status: e.target.value as BalanceStatus})}
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
          value={newBalance.description ?? ''}
          label={t('accounting.update.description')}
          onChange={e => setNewBalance({...newBalance, description: e.target.value})}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained"
          loading={loading} disabled={!newBalance.description}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdateBalance;
