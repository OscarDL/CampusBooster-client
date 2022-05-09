import { FC, useEffect } from 'react';
import { Box, Button, ButtonProps, CircularProgress } from '@mui/material';

import { handleDialogScrollShadow } from '../../../shared/functions';


type DialogButtonProps = ButtonProps & {
  loading?: boolean
};


export const MainDialogButton: FC<DialogButtonProps> = ({children, loading, ...props}) => {
  useEffect(() => {
    handleDialogScrollShadow();
  }, []);


  return (
    <Box sx={{position: 'relative'}}>
      <Button {...props} disabled={loading || props.disabled}>
        {children}
      </Button>

      {loading && (
        <CircularProgress size={24} sx={{position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px'}}/>
      )}
    </Box>
  );
};
