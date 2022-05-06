import { FC, useEffect } from 'react';
import { DialogActions as MuiDialogActions, DialogActionsProps } from '@mui/material';

import { handleDialogScrollShadow } from '../../../shared/functions';


const DialogActions: FC<DialogActionsProps> = ({children, ...props}) => {
  useEffect(() => {
    handleDialogScrollShadow(true);
  }, []);


  return (
    <MuiDialogActions {...props}>
      {children}
    </MuiDialogActions>
  );
};


export default DialogActions;
