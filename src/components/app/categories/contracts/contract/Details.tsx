import dayjs from 'dayjs';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { Contract } from '../../../../../shared/types/contract';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '../../../../shared/dialog';


type Props = {
  open: boolean,
  contract: Contract,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const ContractDetails: FC<Props> = ({contract, open, setOpen}) => {
  const { t } = useTranslation();

  const userFullName = `${contract.User.firstName} ${contract.User.lastName}`;


  return (
    <Dialog
      className="contract-details"
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('contracts.details.title', {user: userFullName})}</DialogTitle>

      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="MuiDialogContent-row">
            <DatePicker readOnly
              onChange={() => null}
              value={dayjs(contract.startDate)}
              label={t('contracts.fields.start_date')}
              renderInput={(params) => <TextField {...params} variant="standard" InputProps={{endAdornment: null}}/>}
            />
            <DatePicker readOnly
              onChange={() => null}
              value={dayjs(contract.endDate)}
              label={t('contracts.fields.end_date')}
              renderInput={(params) => <TextField {...params} variant="standard" InputProps={{endAdornment: null}}/>}
            />
          </Box>
        </LocalizationProvider>

        <Typography sx={{mt: 2}}>
          <Typography color="primary" fontWeight="bold" sx={{display: 'inline'}}>
            {t('contracts.fields.type.title')}
            {t('global.colon')}
          </Typography>
          <Typography sx={{display: 'inline'}}>
            &nbsp;{t('contracts.fields.type.' + contract.type.toLowerCase())}
          </Typography>
        </Typography>

        <Typography sx={{mt: 2}}>
          <Typography color="primary" fontWeight="bold" sx={{display: 'inline'}}>
            {t('contracts.fields.company')}
            {t('global.colon')}
          </Typography>
          <Typography sx={{display: 'inline'}}>
            &nbsp;{contract.company}
          </Typography>
        </Typography>

        <Typography>
          <Typography color="primary" fontWeight="bold" sx={{display: 'inline'}}>
            {t('contracts.fields.url')}
            {t('global.colon')}
          </Typography>
          <Typography sx={{display: 'inline'}}>
            &nbsp;<a href={contract.url} target="_blank" rel="noreferrer">{contract.url}</a>
          </Typography>
        </Typography>

        <Typography>
          <Typography color="primary" fontWeight="bold" sx={{display: 'inline'}}>
            {t('contracts.fields.address')}
            {t('global.colon')}
          </Typography>
          <Typography sx={{display: 'inline'}}>
            &nbsp;{contract.address}
          </Typography>
        </Typography>

        <Typography sx={{mt: 2}}>
          <Typography color="primary" fontWeight="bold" sx={{display: 'inline'}}>
            {t('contracts.fields.supervisor')}
            {t('global.colon')}
          </Typography>
          <Typography sx={{display: 'inline'}}>
            &nbsp;{contract.Supervisor.User.firstName} {contract.Supervisor.User.lastName}
          </Typography>
        </Typography>

        <Typography>
          <Typography color="primary" fontWeight="bold" sx={{display: 'inline'}}>
            {t('contracts.fields.email')}
            {t('global.colon')}
          </Typography>
          <Typography sx={{display: 'inline'}}>
            &nbsp;<a href={'mailto:' + contract.email}>{contract.email}</a>
          </Typography>
        </Typography>

        <Typography>
          <Typography color="primary" fontWeight="bold" sx={{display: 'inline'}}>
            {t('contracts.fields.phone')}
            {t('global.colon')}
          </Typography>
          <Typography sx={{display: 'inline'}}>
            &nbsp;<a href={'tel:' + contract.phone}>{contract.phone}</a>
          </Typography>
        </Typography>

        <Typography sx={{mt: 2}}>
          <Typography color="primary" fontWeight="bold" sx={{display: 'inline'}}>
            {t('contracts.fields.mission')}
            {t('global.colon')}
          </Typography>
          <Typography sx={{display: 'inline'}}>
            &nbsp;{contract.mission}
          </Typography>
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={() => setOpen(false)}>
          {t('global.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default ContractDetails;
