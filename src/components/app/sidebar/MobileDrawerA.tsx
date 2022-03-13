import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Global } from '@emotion/react';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Typography } from '@mui/material';

import { values } from '../../../shared/utils';


const drawerHeight = 80; // px

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: grey[100]
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white'
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 40,
  height: 6,
  borderRadius: 3,
  margin: '0.5rem auto 0',
  backgroundColor: grey[300]
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
            overflow: 'visible',
            margin: '0 0.5rem'
          }
        }}
      />
      <SwipeableDrawer
        open={open}
        anchor="bottom"
        disableSwipeToOpen={false}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
        swipeAreaWidth={drawerHeight}
        ModalProps={{keepMounted: true}}
      >
        <StyledBox
          sx={{
            left: 0,
            right: 0,
            display: 'flex',
            top: -drawerHeight,
            position: 'absolute',
            visibility: 'visible',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            flexDirection: 'column',
            height: `${drawerHeight}px`,
            boxShadow: '0 0.5rem 0 0 white, 0 0 0.25rem 0.25rem #0002'
          }}
        >
          <Puller/>
          <Typography sx={{px: 2, flexGrow: 1, display: 'grid', placeItems: 'center'}}>
            Swipe up to navigate
          </Typography>
          <Divider sx={{transform: 'translateY(2px)'}}/>
        </StyledBox>

        <List className="drawer">
          {values.categories.map(category => (
            <Link key={category} to={'/' + category}>
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
