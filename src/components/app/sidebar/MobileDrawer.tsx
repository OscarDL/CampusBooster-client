import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Global } from '@emotion/react';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Typography } from '@mui/material';

import { values } from '../../../shared/utils';


const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));


function MobileDrawer() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };


  return (
    <Root className="drawer" id="mobile">
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{keepMounted: true}}
      >
        <StyledBox
          sx={{
            //boxShadow: '0 0.66rem 0.5rem 0.66rem grey',
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller/>
          <Typography sx={{p: 2}}>
            Swipe up to navigate
          </Typography>
        </StyledBox>

        <List className="drawer">
          {values.categories.map(category => (
            <Link to={'/' + category}>
              <ListItemButton key={category} className="drawer__item" sx={{px: 2.5, minHeight: 48}}>
                <ListItemIcon className="drawer__icon" sx={{minWidth: 0, justifyContent: 'center'}}>
                  <span className="material-icons-round">
                    {t(`${category}.icon`)}
                  </span>
                </ListItemIcon>

                <ListItemText className="drawer__text" sx={{ml:3}}>
                  {t(`${category}.title`)}
                </ListItemText>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </SwipeableDrawer>
    </Root>
  );
};


export default MobileDrawer;
