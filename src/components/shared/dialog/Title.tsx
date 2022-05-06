import { FC } from 'react';
import { DialogTitle as MuiDialogTitle, DialogTitleProps } from '@mui/material';


const DialogTitle: FC<DialogTitleProps> = ({children, ...props}) => (
  <MuiDialogTitle {...props}>
    {children}
  </MuiDialogTitle>
);


export default DialogTitle;
