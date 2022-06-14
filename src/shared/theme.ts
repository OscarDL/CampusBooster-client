import { createTheme, PaletteMode } from '@mui/material';


// Global Material-UI theme value overrides
export const getMuiTheme = (mode: PaletteMode) => createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 'unset',
          fontWeight: '600',
          letterSpacing: '0',
          textTransform: 'none',
          padding: '0.4rem 0.8rem',
          borderRadius: 'var(--radius-small)',
          
          '&.MuiButton-contained:not(.Mui-disabled)': {
            color: 'white'
          },

          '&.MuiButton-text': {
            color: 'rgb(var(--accent-color))'
          },

          '&.Mui-disabled': {
            opacity: '0.5',
            '[class*="material-icons"]': {
              color: 'initial'
            }
          }
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

    MuiInputBase: {
      styleOverrides: {
        root: {
          color: 'rgb(var(--text-color))',

          '.MuiOutlinedInput-notchedOutline': {
            borderWidth: '2px',
            transition: '0.25s',
            borderRadius: 'var(--radius-small)'
          },

          ':hover > fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(var(--accent-color), 0.5)'
          },

          '&.Mui-focused > fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(var(--accent-color))'
          },

          '.MuiSelect-icon': {
            color: 'rgb(var(--text-color))'
          },
          '.MuiIconButton-root': {
            color: 'rgb(var(--text-color))'
          }
        }
      }
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          zIndex: 'unset',
          fontWeight: '500',
          color: 'rgba(var(--text-color), 0.66)',
        }
      }
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '> .MuiInput-root::before': {
            transition: '0.25s',
            borderBottom: '2px solid rgb(var(--divider-color-darker))'
          },
          '> .MuiInput-root:hover:not(.Mui-disabled)::before': {
            borderWidth: '2px',
            borderColor: 'rgba(var(--accent-color), 0.5)'
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
          },
          '&.MuiDrawer-paper': {
            backgroundColor: 'rgb(var(--card-bg))',
            borderRight: '1px solid rgb(var(--divider-color))'
          }
        }
      }
    },

    MuiDialog: {
      styleOverrides: {
        root: {
          inset: '0',
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
          color: 'rgb(var(--accent-color))',
          transition: 'box-shadow 0.25s',
          boxShadow: '0 0.2rem 0.2rem -0.1rem rgb(var(--divider-color))',

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
            flexGrow: '1',
            minWidth: 'calc((100% - 1rem) / 2)'
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
            color: 'rgb(var(--accent-color))'
          },
          ':focus-visible': {
            color: 'rgb(var(--accent-color))'
          },

          '&.Mui-selected': {
            fontWeight: 'bold',
            color: 'rgb(var(--accent-color))',
            backgroundColor: `rgba(var(--accent-color), 0.075)`,
            '&.Mui-focusVisible': {
              backgroundColor: `rgba(var(--accent-color), 0.075)`
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
            color: 'rgb(var(--accent-color))',
            backgroundColor: `rgba(var(--accent-color), 0.075)`
          },
          ':focus-visible': {
            color: 'rgb(var(--accent-color))'
          }
        }
      }
    }
  },
  
  palette: {
    mode,
    primary: {
      main: 'rgb(var(--accent-color))'
    }
  },

  typography: {
    fontFamily: 'inherit',
    allVariants: {
      color: 'rgb(var(--text-color))'
    }
  }
});


export const dataGridTheme = () => ({
  // DataGrid wrapper
  border: 0,
  backgroundColor: 'rgb(var(--card-bg))',
  boxShadow: '0 0 0.5rem 0.05rem rgba(0, 0, 0, 0.05)',

  // Header component
  '.MuiDataGrid-customToolbar': {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '56px',
    padding: '0 0.5rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgb(var(--divider-color))',

    '.MuiDataGrid-customToolbar__info': {
      display: 'flex',
      padding: '0.5rem',
      fontWeight: '600',
      fontSize: '1.2rem',
      alignItems: 'center',

      '> span': {
        color: 'rgb(var(--accent-color))',

        '+ button': {
          margin: '0 0 -1px 1rem'
        }
      }
    },

    '.MuiDataGrid-toolbarContainer': {
      padding: '0',
      flexWrap: 'wrap',

      '.MuiButton-iconSizeSmall': {
        '.MuiSvgIcon-root': {
          fontSize: '1.25rem'
        }
      }
    }
  },

  // Columns component
  '.MuiDataGrid-columnHeaders': {},

  // Cell component
  '.MuiDataGrid-cell': {},

  // Footer component
  '.MuiDataGrid-customFooter': {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    boxShadow: '0 -0.25rem 0.25rem -0.125rem rgb(var(--divider-color))',

    '> *': {
      border: 'none'
    },

    '#pagination + label': {
      paddingLeft: '0.5rem',
      textTransform: 'uppercase'
    }
  }
});
