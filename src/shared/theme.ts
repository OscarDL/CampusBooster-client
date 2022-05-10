import { createTheme } from '@mui/material';

import { colors } from './utils';


// Global Material-UI theme value overrides
export const muiTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          letterSpacing: 0,
          textTransform: 'none',
          borderRadius: 'var(--radius-small)'
        }
      }
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          'span[class*="material-icons"]': {
            transition: '0.25s'
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

    MuiDialog: {
      styleOverrides: {
        root: {
          inset: 0,
          position: 'fixed',
          zIndex: 'var(--z-index-mui-dialog)'
        }
      }
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: colors.accent,

          '+ div.MuiDialogContent-root': {
            paddingTop: '20px'
          }
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
          gap: '0.75rem',
          padding: '0.75rem',
          transition: 'box-shadow 0.25s',
          boxShadow: '0 -0.2rem 0.2rem -0.1rem rgb(var(--divider-color))',

          '.MuiButton-root': {
            fontSize: '1rem'
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
          ':focus-visible': {
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
          transition: '0.25s',

          ':hover': {
            color: colors.accent,
            backgroundColor: `rgba(${colors.accentRGB}, 0.075)`
          },
          ':focus-visible': {
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
