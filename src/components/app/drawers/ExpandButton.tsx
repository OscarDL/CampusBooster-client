import { FC } from 'react';
import { Divider, IconButton } from '@mui/material';


type Props = {
  expanded: boolean,
  toggleDrawer: React.MouseEventHandler<HTMLButtonElement>
};


const ExpandButton: FC<Props> = ({expanded, toggleDrawer}) => {
  return (
    <div className="drawer__expand-btn">
      <Divider/>
      <IconButton onClick={toggleDrawer} sx={{m: 1.5}}>
        <span className="material-icons drawer__icon" style={{transform: `rotateZ(${expanded ? -180 : 0}deg)`}}>
          chevron_right
        </span>
      </IconButton>
    </div>
  );
};


export default ExpandButton;
