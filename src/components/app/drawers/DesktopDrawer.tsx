import { useSelector } from 'react-redux';
import { FC, useEffect, useState } from 'react';
import { styled, CSSObject, Theme } from '@mui/material/styles';
import { Drawer as MuiDrawer, List, Divider } from '@mui/material';

import NavItem from './NavItem';
import ExpandButton from './ExpandButton';

import { values } from '../../../shared/utils';
import { useStateWithCallback } from '../../../shared/hooks';
import { getLoggedInAuthState, getUserCategories } from '../../../shared/functions';


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


const DesktopDrawer: FC = () => {
  const { user } = useSelector(getLoggedInAuthState);
  const [expanded, setExpanded] = useStateWithCallback(
    !localStorage.getItem('hideDrawer')
  );


  const saveDrawer = () => {
    if (!expanded)
      localStorage.removeItem('hideDrawer');
    else
      localStorage.setItem('hideDrawer', 'true');
  };

  const toggleDrawer = () => {
    setExpanded(expanded => !expanded, saveDrawer);
  };


  return (
    <div className="drawer" id="drawer-desktop">
      <Drawer variant="permanent" open={expanded}>
        <List>
          <NavItem
            category="settings"
            expanded={expanded}
            text={`${user.firstName} ${user.lastName}`}
          />
        </List>

        <Divider/>

        <List id="desktop-nav" sx={{overflowX: 'hidden', flexGrow: 1}}>
          {getUserCategories(values.categories, user).map(category => (
            <NavItem
              key={category}
              category={category}
              expanded={expanded}
            />
          ))}
        </List>

        <ExpandButton expanded={expanded} toggleDrawer={toggleDrawer}/>
      </Drawer>
    </div>
  );
};


export default DesktopDrawer;
