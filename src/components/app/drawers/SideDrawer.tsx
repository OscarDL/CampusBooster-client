import { FC, useEffect, useState } from 'react';
import { styled, CSSObject, Theme } from '@mui/material/styles';
import { Drawer as MuiDrawer, List, Divider } from '@mui/material';

import { useAppSelector } from '../../../store/store';
import { categories } from '../../../shared/utils/values';
import { getLoggedInAuthState, getUserCategories } from '../../../shared/functions';

import NavItem from './NavItem';
import ExpandButton from './ExpandButton';


const drawerWidth = 240;

const drawerTheme = (theme: Theme, expanded: boolean, scrollbarWidth: number): CSSObject => {
  return {
    width: expanded ? drawerWidth : `calc(4rem + ${scrollbarWidth}px + 1px)`,

    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration[expanded ? 'leavingScreen' : 'enteringScreen'],
    })
  };
};

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open: expanded }) => {
    const [scrollbarWidth, setScrollbarWidth] = useState(0);

    useEffect(() => {
      const drawer = document.getElementById('desktop-nav');
      const getScrollbarWidth = () => setScrollbarWidth((drawer?.offsetWidth ?? 0) - (drawer?.clientWidth ?? 0));

      getScrollbarWidth();
      window.addEventListener('resize', getScrollbarWidth);
      return () => window.removeEventListener('resize', getScrollbarWidth);
    }, []);

  
    return {
      flexShrink: 0,
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...drawerTheme(theme, expanded!, scrollbarWidth),
      '& .MuiDrawer-paper': drawerTheme(theme, expanded!, scrollbarWidth)
    };
  }
);


type Props = {
  forceCollapse: boolean
};


const SideDrawer: FC<Props> = ({forceCollapse}) => {
  const { user } = useAppSelector(getLoggedInAuthState);

  const [collapsed, setCollapsed] = useState(forceCollapse || !!localStorage.getItem('collapseDrawer'));


  const saveDrawerState = () => {
    if (collapsed) {
      localStorage.removeItem('collapseDrawer');
    } else {
      localStorage.setItem('collapseDrawer', 'true');
    }
  };

  const toggleDrawer = () => {
    saveDrawerState();
    setCollapsed(collapsed => !collapsed);
  };


  useEffect(() => {
    setCollapsed(forceCollapse || !!localStorage.getItem('collapseDrawer'));
  }, [forceCollapse, setCollapsed]);


  return (
    <div className="drawer drawer-root">
      <Drawer variant="permanent" open={!collapsed}>
        <List>
          <NavItem
            category="profile"
            collapsed={forceCollapse || collapsed}
            text={`${user.firstName} ${user.lastName}`}
          />
        </List>

        <Divider/>

        <List id="desktop-nav" sx={{overflowX: 'hidden', flexGrow: 1}}>
          {getUserCategories(categories, user).map(category => (
            <NavItem
              key={category}
              category={category}
              collapsed={collapsed}
            />
          ))}
        </List>

        <ExpandButton collapsed={collapsed} toggleDrawer={toggleDrawer}/>
      </Drawer>
    </div>
  );
};


export default SideDrawer;
