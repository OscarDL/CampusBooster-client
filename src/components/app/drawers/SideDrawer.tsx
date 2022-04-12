import { useSelector } from 'react-redux';
import { FC, useEffect, useState } from 'react';
import { styled, CSSObject, Theme } from '@mui/material/styles';
import { Drawer as MuiDrawer, List, Divider } from '@mui/material';

import { values } from '../../../shared/utils';
import { useStateWithCallback } from '../../../shared/hooks';
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
  const { user } = useSelector(getLoggedInAuthState);
  const [collapsed, setCollapsed] = useStateWithCallback(
    forceCollapse || !localStorage.getItem('collapseDrawer')
  );


  const saveDrawer = () => {
    if (!collapsed) {
      localStorage.removeItem('collapseDrawer');
    } else {
      localStorage.setItem('collapseDrawer', 'true');
    }
  };

  const toggleDrawer = () => {
    setCollapsed(collapsed => !collapsed, saveDrawer);
  };


  useEffect(() => {
    setCollapsed(forceCollapse || !localStorage.getItem('collapseDrawer'));
  }, [forceCollapse, setCollapsed]);


  return (
    <div className="drawer drawer-root">
      <Drawer variant="permanent" open={!collapsed}>
        <List>
          <NavItem
            category="settings"
            collapsed={forceCollapse || collapsed}
            text={`${user.firstName} ${user.lastName}`}
          />
        </List>

        <Divider/>

        <List id="desktop-nav" sx={{overflowX: 'hidden', flexGrow: 1}}>
          {getUserCategories(values.categories, user).map(category => (
            <NavItem
              key={category}
              category={category}
              collapsed={collapsed}
            />
          ))}
        </List>

        <ExpandButton expanded={!collapsed} toggleDrawer={toggleDrawer}/>
      </Drawer>
    </div>
  );
};


export default SideDrawer;
