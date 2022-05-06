import { createTheme } from '@mui/material';

import { colors } from './utils';


// Global Material-UI theme value overrides
export const muiTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          letterSpacing: 0,
          // fontSize: '1.2rem',
          textTransform: 'none',
          borderRadius: 'var(--radius-small)'
        }
      }
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          ':hover': {
            color: colors.accent
          },

          ':focus': {
            color: colors.accent
          }
        }
      }
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          height: '1px',
          border: 'none',
          backgroundColor: 'rgb(var(--divider-color))'
        }
      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          '&.MuiDialog-paper': {
            borderRadius: 'var(--radius-medium)'
          }
        }
      }
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: colors.accent
        }
      }
    },

    MuiDialogContent: {
      styleOverrides: {
        root: {
          gap: '10px',
          display: 'flex',
          flexDirection: 'column',

          '> .MuiDialogContent-row': {
            gap: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center'
          },

          '> .MuiDialogContent-row > *': {
            flexGrow: 1
          }
        }
      }
    },

    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '0.75rem',
          transition: 'box-shadow 0.25s',
          boxShadow: '0 -0.2rem 0.2rem -0.1rem rgb(var(--divider-color))',

          '.MuiButton-root': {
            fontSize: '1rem'
          },

          '.MuiButton-root.MuiDialogButton-confirm': {
            fontWeight: 'bold'
          }
        }
      }
    },

    MuiSelect: {
      styleOverrides: {
        icon: {
          transition: '0.25s'
        }
      }
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit'
        }
      }
    },

    MuiMenuItem: {
      defaultProps: {
        classes: {
          root: 'select-item'
        }
      },

      styleOverrides: {
        root: {
          transition: '0.25s',
          ':hover': {
            color: colors.accent
          },
          ':focus': {
            color: colors.accent
          },

          '&.Mui-selected': {
            fontWeight: 'bold',
            color: colors.accent,
            backgroundColor: `rgba(${colors.accentRGB}, 0.075)`,
            '&.Mui-focusVisible': {
              backgroundColor: `rgba(${colors.accentRGB}, 0.075)`
            }
          }
        },
      }
    },

    MuiTab: {
      styleOverrides: {
        root: {
          ':hover': {
            color: colors.accent,
            backgroundColor: `rgba(${colors.accentRGB}, 0.075)`
          },
          ':focus': {
            color: colors.accent
          }
        }
      }
    }
  },
  

  palette: {
    primary: {
      main: colors.accent
    },
    divider: 'rgb(var(--divider-color))'
  },

  typography: {
    fontFamily: 'inherit'
  }
});
