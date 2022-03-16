import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Global } from '@emotion/react';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Box, Divider, List, SwipeableDrawer } from '@mui/material';

import NavItem from './NavItem';
import { getLoggedInAuthState, values } from '../../../shared/utils';


const drawerHeight = 80; // px

const Puller = styled(Box)(() => ({
  width: 40,
  height: 6,
  borderRadius: 3,
  margin: '0.5rem auto 0',
  backgroundColor: grey[300]
}));


function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(getLoggedInAuthState);
  
  const showDrawer = () => () => setOpen(true);
  const hideDrawer = () => () => setOpen(false);


  return (
    <div className="drawer" id="drawer-mobile">
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            margin: '0 0.5rem',
            overflow: 'visible'
          }
        }}
      />

      <SwipeableDrawer
        open={open}
        anchor="bottom"
        onOpen={showDrawer()}
        onClose={hideDrawer()}
        disableSwipeToOpen={false}
        swipeAreaWidth={drawerHeight}
        ModalProps={{keepMounted: true}}
      >
        <div
          className="drawer-mobile__header"
          style={{top: -drawerHeight + 'px', height: drawerHeight + 'px'}}
        >
          <Puller/>
          <p>Swipe up to navigate</p>
          <Divider style={{transform: 'translateY(2px)'}}/>
        </div>

        <List className="drawer">
          {values.categories.map(category => (
            <NavItem
              key={category}
              category={category}
              onClick={hideDrawer()}
            />
          ))}

          <Divider/>

          <NavItem
            category="settings"
            onClick={hideDrawer()}
            text={`${user.firstName} ${user.lastName}`}
          />
        </List>
      </SwipeableDrawer>
    </div>
  );
};


export default MobileDrawer;
