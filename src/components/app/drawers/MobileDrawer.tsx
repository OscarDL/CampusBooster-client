import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Divider, List, SwipeableDrawer } from '@mui/material';

import NavItem from './NavItem';
import Puller from '../../shared/puller/Puller';
import { getLoggedInAuthState, values } from '../../../shared/utils';


const drawerHeight = 80; // px


const MobileDrawer: FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(getLoggedInAuthState);
  const { category } = useSelector(state => state.app);


  const showDrawer = () => setOpen(true);
  const hideDrawer = () => setOpen(false);


  return (
    <div className="drawer" id="drawer-mobile">
      <SwipeableDrawer
        open={open}
        anchor="bottom"
        onOpen={showDrawer}
        onClose={hideDrawer}
        disableSwipeToOpen={false}
        swipeAreaWidth={drawerHeight}
        ModalProps={{keepMounted: true}}
      >
        <div
          className="drawer-mobile__header"
          style={{top: -drawerHeight + 'px', height: drawerHeight + 'px'}}
        >
          <Puller/>
          <p>{t(category)}</p>
        </div>

        <List className="drawer">
          <Divider style={{marginTop: 0}}/>

          {values.categories.map(category => (
            <NavItem
              key={category}
              category={category}
              hideDrawer={hideDrawer}
            />
          ))}

          <Divider/>

          <NavItem
            category="settings"
            hideDrawer={hideDrawer}
            text={`${user.firstName} ${user.lastName}`}
          />
        </List>
      </SwipeableDrawer>
    </div>
  );
};


export default MobileDrawer;
