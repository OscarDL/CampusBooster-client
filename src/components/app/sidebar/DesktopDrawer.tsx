import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled, CSSObject, Theme } from '@mui/material/styles';
import { Drawer as MuiDrawer, List, Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import ExpandButton from './ExpandButton';
import ProfileButton from './ProfileButton';
import { values } from '../../../shared/utils';
import { useStateWithCallback } from '../../../shared/hooks';


const drawerWidth = 240;

const drawerTheme = (theme: Theme, expanded: boolean): CSSObject => ({
  width: expanded ? drawerWidth : `calc(${theme.spacing(8)} + 1px)`,

  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration[expanded ? 'leavingScreen' : 'enteringScreen'],
  })
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open: expanded }) => ({
    overflowX: 'hidden',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...drawerTheme(theme, expanded!),
    '& .MuiDrawer-paper': drawerTheme(theme, expanded!)
  }),
);


function SidebarDrawer() {
  const { t } = useTranslation();

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
    <div className="drawer" id="desktop">
      <Drawer variant="permanent" open={expanded}>
        <ProfileButton opacity={expanded ? 1 : 0}/>

        <Divider/>

        <List>
          {values.categories.map(category => (
            <Link to={'/' + category}>
              <ListItemButton key={category} className="drawer__item" sx={{px: 2.5, minHeight: 48}}>
                <ListItemIcon className="drawer__icon" sx={{minWidth: 0, justifyContent: 'center'}}>
                  <span className="material-icons-round">
                    {t(`${category}.icon`)}
                  </span>
                </ListItemIcon>

                <ListItemText className="drawer__text" sx={{ml:3, opacity: expanded ? 1 : 0}}>
                  {t(`${category}.title`)}
                </ListItemText>
              </ListItemButton>
            </Link>
          ))}
        </List>

        <ExpandButton expanded={expanded} toggleDrawer={toggleDrawer}/>
      </Drawer>
    </div>
  );
};


export default SidebarDrawer;
