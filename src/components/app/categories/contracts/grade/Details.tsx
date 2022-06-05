import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../store/store';
import { Contract } from '../../../../../shared/types/contract';
import { deleteTool } from '../../../../../store/features/tools/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';


type Props = {
  open: boolean,
  contract: Contract,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const DeleteTool: FC<Props> = ({contract, open, setOpen}) => {
  return (
    <h1>contract details</h1>
  );
};


export default DeleteTool;
