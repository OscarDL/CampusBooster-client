import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonBase, IconButton } from '@mui/material';

import { values } from '../../../../../shared/utils';
import { ToolLink } from '../../../../../shared/types/tools';
import { getLoggedInAuthState } from '../../../../../shared/functions';

import UpdateTool from './Update';


type Props = {
  tool: ToolLink
};


const Tool: FC<Props> = ({tool: {img, url, title, category, description}}) => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(getLoggedInAuthState);

  // Image is retrieved in base64 from AWS
  const imageType = img.slice(img.lastIndexOf('.'));


  return (
    <div className="tool">
      <ButtonBase
        component="a" href={url}
        target="_blank" rel="noreferrer"
      >
        <div className="tool__header">
          <img src={`data:image/${imageType};base64,${img}`} alt="logo"/>
        </div>

        <div className="tool__content">
          <h2
            title={title}
            // Add padding if user has access to the edit tool button
            style={user.role === values.roles.campusBoosterAdmin ? {paddingRight: '2rem'} : {}}
          >
            {title}
          </h2>
          <p title={description}>{description}</p>
        </div>
      </ButtonBase>

      {user.role === values.roles.campusBoosterAdmin && (
        <IconButton className="edit-tool-btn" onClick={() => setOpen(true)}>
          <span className="material-icons">edit</span>
        </IconButton>
      )}

      <UpdateTool tool={{img, url, title, category, description}} open={open} setOpen={setOpen}/>
    </div>
  );
};


export default Tool;
