import { FC, useState } from 'react';
import { ButtonBase, IconButton } from '@mui/material';

import { values } from '../../../../../shared/utils';
import { useAppSelector } from '../../../../../store/store';
import { getLoggedInAuthState } from '../../../../../shared/functions';
import { ToolLinkBase64Image } from '../../../../../shared/types/tools';

import UpdateTool from './Update';
import { useTranslation } from 'react-i18next';


type Props = {
  tool: ToolLinkBase64Image
};


const Tool: FC<Props> = ({tool: {img, url, title, category, description, imgBase64}}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);
  
  const [open, setOpen] = useState(false);


  return (
    <div className="tool">
      <ButtonBase
        component="a" href={url}
        target="_blank" rel="noreferrer"
      >
        <div className="tool__header">
          <img src={imgBase64 || '/assets/images/tools/tool.svg'} alt="logo"/>
        </div>

        <div className="tool__content">
          <h2
            title={title}
            // Add padding if user has access to the edit tool button
            style={user.role === values.roles.campusBoosterAdmin ? {paddingRight: '2rem'} : {}}
          >
            {title}
          </h2>
          <p title={description}>{description || t('tools.no_description')}</p>
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
