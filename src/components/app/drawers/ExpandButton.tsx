import { FC } from 'react';
import { Divider, IconButton } from '@mui/material';


type Props = {
  collapsed: boolean,
  toggleDrawer: React.MouseEventHandler<HTMLButtonElement>
};


const ExpandButton: FC<Props> = ({collapsed, toggleDrawer}) => {
  return (
    <div className="drawer__expand-btn">
      <Divider/>
      <IconButton onClick={toggleDrawer} sx={{m: 1.5}}>
        <span
          className="material-icons drawer__icon"
          style={{transform: `rotateZ(${collapsed ? 0 : -180}deg)`}}
        >
          chevron_right
        </span>
      </IconButton>
    </div>
  );
};


export default ExpandButton;
