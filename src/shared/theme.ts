import { createTheme } from '@mui/material';

import { colors } from './utils';


// Global Material-UI theme value overrides
export const muiTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          letterSpacing: 0,
          fontSize: '1.2rem',
          fontFamily: 'inherit',
          textTransform: 'none',
          borderRadius: 'var(--radius-small)'
        }
      }
    }
  },
  
  palette: {
    primary: {
      main: colors.accent
    },
    divider: 'rgb(var(--divider-color))'
  }
});
