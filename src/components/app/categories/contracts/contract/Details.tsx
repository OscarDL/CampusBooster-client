import dayjs from 'dayjs';
import JSZip from 'jszip';
import { FC } from 'react';
import { saveAs } from 'file-saver';
import { Download } from '@mui/icons-material';
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


  const downloadFiles = () => {
    const zip = new JSZip();
    const keys = contract.fileKeys;
    const files = contract.fileBase64;

    for (let i = 0; i < files.length; i++) {
      const name = keys[i];
      const file = files[i].split('base64,')?.[1];
      zip.file(name.slice(name.lastIndexOf('/') + 1), file, {base64: true});
    };

    zip.generateAsync({type: 'blob'}).then((content) => {
      const student = `${contract.User.firstName} ${contract.User.lastName}`;
      saveAs(content, `${student} - ${contract.company} (${t('contracts.fields.type.' + contract.type.toLowerCase())}).zip`);
    });
  };


  return (
    <Dialog
      fullWidth maxWidth="sm"
      className="contract-details"
      open={open} onClose={() => setOpen(false)}
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
          <Typography color="primary" fontWeight="bold" component="span">
            {t('contracts.fields.type.title')}
            {t('global.colon')}
          </Typography>
          <Typography component="span">
            &nbsp;{t('contracts.fields.type.' + contract.type.toLowerCase())}
          </Typography>
        </Typography>

        <Typography sx={{mt: 2}}>
          <Typography color="primary" fontWeight="bold" component="span">
            {t('contracts.fields.company')}
            {t('global.colon')}
          </Typography>
          <Typography component="span">
            &nbsp;{contract.company}
          </Typography>
        </Typography>

        <Typography>
          <Typography color="primary" fontWeight="bold" component="span">
            {t('contracts.fields.address')}
            {t('global.colon')}
          </Typography>
          <Typography component="span">
            &nbsp;{contract.address}
          </Typography>
        </Typography>

        <Typography>
          <Typography color="primary" fontWeight="bold" component="span">
            {t('contracts.fields.supervisor')}
            {t('global.colon')}
          </Typography>
          <Typography component="span">
            &nbsp;{contract.Supervisor.User.firstName} {contract.Supervisor.User.lastName}
          </Typography>
        </Typography>

        <Typography>
          <Typography color="primary" fontWeight="bold" component="span">
            {t('contracts.fields.email')}
            {t('global.colon')}
          </Typography>
          <Typography component="span">
            &nbsp;<a href={'mailto:' + contract.email}>
              <span>{contract.email}</span>
            </a>
          </Typography>
        </Typography>

        <Typography>
          <Typography color="primary" fontWeight="bold" component="span">
            {t('contracts.fields.phone')}
            {t('global.colon')}
          </Typography>
          <Typography component="span">
            &nbsp;<a href={'tel:' + contract.phone}>
              <span>{contract.phone}</span>
            </a>
          </Typography>
        </Typography>

        <Typography sx={{mt: 2}}>
          <Typography color="primary" fontWeight="bold" component="span">
            {t('contracts.fields.mission')}
            {t('global.colon')}
          </Typography>
          <Typography component="span">
            &nbsp;{contract.mission}
          </Typography>
        </Typography>

        <Button
          sx={{mt: 2}} variant="contained"
          disabled={!contract.fileKeys.length}
          startIcon={<Download/>} onClick={downloadFiles}
        >
          {t('contracts.fields.files', {count: contract.fileKeys.length})}
        </Button>
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
