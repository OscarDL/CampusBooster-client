import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonBase, IconButton } from '@mui/material';

import { values } from '../../../../../shared/utils';
import { ToolCategory } from '../../../../../shared/types/tools';
import { getLoggedInAuthState } from '../../../../../shared/functions';

import UpdateTool from './Update';


type Props = {
  img: string,
  url: string,
  title: string,
  description: string,
  category: ToolCategory
};


const Tool: FC<Props> = ({img, url, title, category, description}) => {
  const { user } = useSelector(getLoggedInAuthState);

  const [open, setOpen] = useState(false);


  return (
    <div className="tool">
      <ButtonBase
        component="a" href={url}
        target="_blank" rel="noreferrer"
      >
        <div className="tool__header">
          <img src={`/assets/images/tools/${category}/${img}`} alt="logo"/>
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
