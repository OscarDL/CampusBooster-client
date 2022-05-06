import { FC } from 'react';
import { Dialog as MuiDialog, DialogProps } from '@mui/material';


const Dialog: FC<DialogProps> = ({children, ...props}) => (
  <MuiDialog {...props}>
    {children}
  </MuiDialog>
);


export default Dialog;
