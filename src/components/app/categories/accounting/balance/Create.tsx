import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { createBalance } from '../../../../../store/features/accounting/slice';
import { BalanceRequest, BalanceStatus } from '../../../../../shared/types/accounting';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import SelectBalanceUser from './SelectUser';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newBalanceRequest = () => ({
  debit: 0, credit: 0, userId: 0, status: BalanceStatus.pending, description: '', dateRequested: dayjs().toISOString()
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

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
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
    }

    setLoading(false);
  };


  return (
    <Dialog
      onSubmit={handleSubmit}
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('accounting.create.title')}</DialogTitle>

      <DialogContent>
        <SelectBalanceUser balance={balance} setBalance={setBalance}/>

        <FormControl sx={{my: 2}}>
          <InputLabel id="balance-select-user">{t('accounting.status.title')}</InputLabel>
          <Select
            size="small" value={balance.status}
            labelId="balance-select-user" label={t('accounting.status.title')}
            onChange={e => setBalance({...balance, status: e.target.value as BalanceStatus})}
          >
            {Object.keys(BalanceStatus).map(status => (
              <MenuItem value={status}>{t('accounting.status.' + status)}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="MuiDialogContent-row">
          <TextField
            required
            type="number"
            margin="dense"
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
            margin="dense"
            variant="standard"
            name="cb-balance-debit"
            value={balance.debit ?? ''}
            label={t('accounting.create.debit')}
            onChange={e => handleChangeCreditDebit(e, 'debit')}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
          />
        </div>

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
