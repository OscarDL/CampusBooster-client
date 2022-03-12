import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { getLoggedInAuthState } from '../../../shared/utils';


type Props = {
  opacity: number
};


function ProfileButton({opacity}: Props) {
  const { user } = useSelector(getLoggedInAuthState);

  return (
    <List>
      <Link to="/settings">
        <ListItemButton className="drawer__item" sx={{px: 2.5, minHeight: 48}}>
          <ListItemIcon className="drawer__icon" sx={{minWidth: 0, justifyContent: 'center'}}>
            <span className="material-icons-outlined">account_circle</span>
          </ListItemIcon>

          <ListItemText className="drawer__text" sx={{ml:3, opacity}}>
            {user.firstName} {user.lastName}
          </ListItemText>
        </ListItemButton>
      </Link>
    </List>
  );
};


export default ProfileButton;
