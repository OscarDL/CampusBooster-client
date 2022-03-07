import { Divider, IconButton } from '@mui/material';


type Props = {
  expanded: boolean,
  toggleDrawer: React.MouseEventHandler<HTMLButtonElement>
};


function ExpandButton({expanded, toggleDrawer}: Props) {
  return (
    <div className="drawer__expand-btn">
      <Divider/>
      <IconButton className="drawer__icon" onClick={toggleDrawer} sx={{mx: 1.5, my: 1}}>
        <span className="material-icons" style={{transition: '0.25s', transform: `rotateZ(${expanded ? -180 : 0}deg)`}}>chevron_right</span>
      </IconButton>
    </div>
  );
};


export default ExpandButton;
