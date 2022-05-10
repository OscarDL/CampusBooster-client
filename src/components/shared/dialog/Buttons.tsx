import { FC, useEffect } from 'react';
import { Box, Button, ButtonProps, CircularProgress, SxProps } from '@mui/material';

import { handleDialogScrollShadow } from '../../../shared/functions';


type DialogButtonProps = ButtonProps & {
  loading?: boolean
};

const circularProgressStyle: SxProps = {
  top: '50%',
  left: '50%',
  marginTop: '-12px',
  marginLeft: '-12px',
  position: 'absolute'
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
        <CircularProgress size={24} color={props.color} sx={circularProgressStyle}/>
      )}
    </Box>
  );
};
