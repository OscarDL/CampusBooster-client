import { FC, useEffect } from 'react';
import { DialogContent as MuiDialogContent, DialogContentProps } from '@mui/material';

import { handleDialogScrollShadow } from '../../../shared/functions';


const DialogContent: FC<DialogContentProps> = ({children, ...props}) => {
  useEffect(() => {
    window.addEventListener('resize', handleDialogScrollShadow);
    return () => window.removeEventListener('resize', handleDialogScrollShadow);
  }, []);

  return (
    <MuiDialogContent onScroll={handleDialogScrollShadow} {...props}>
      {children}
    </MuiDialogContent>
  );
};


export default DialogContent;
