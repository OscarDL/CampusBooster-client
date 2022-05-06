import { FC, useEffect } from 'react';
import { DialogContent as MuiDialogContent, DialogContentProps } from '@mui/material';

import { handleDialogScrollShadow } from '../../../shared/functions';


const DialogContent: FC<DialogContentProps> = ({children, ...props}) => {
  useEffect(() => {
    window.addEventListener('resize', () => handleDialogScrollShadow(false));
    return () => window.removeEventListener('resize', () => handleDialogScrollShadow(false));
  }, []);

  return (
    <MuiDialogContent onScroll={() => handleDialogScrollShadow(false)} {...props}>
      {children}
    </MuiDialogContent>
  );
};


export default DialogContent;
