import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, List, SwipeableDrawer } from '@mui/material';

import { useAppSelector } from '../../../store/store';
import { categories } from '../../../shared/utils/values';
import { getLoggedInAuthState, getUserCategories } from '../../../shared/functions';

import NavItem from './NavItem';
import Puller from '../../shared/puller/Puller';


const drawerHeight = 80; // px


const SwipeDrawer: FC = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { category } = useAppSelector(state => state.app);

  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const hideDrawer = () => setOpen(false);


  return (
    <div className="drawer drawer-root" id="mobile-drawer">
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

          {getUserCategories(categories, user).map(category => (
            <NavItem
              key={category}
              category={category}
              hideDrawer={hideDrawer}
            />
          ))}

          <Divider/>

          <NavItem
            category="profile"
            hideDrawer={hideDrawer}
            text={`${user.firstName} ${user.lastName}`}
          />
        </List>
      </SwipeableDrawer>
    </div>
  );
};


export default SwipeDrawer;
