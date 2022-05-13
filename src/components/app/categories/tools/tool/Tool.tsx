import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Delete } from '@mui/icons-material';
import { Box, ButtonBase, IconButton } from '@mui/material';

import { roles } from '../../../../../shared/utils/values';
import { useAppSelector } from '../../../../../store/store';
import { getLoggedInAuthState } from '../../../../../shared/functions';
import { ToolLinkBase64Image } from '../../../../../shared/types/tools';

import UpdateTool from './dialogs/Update';
import DeleteTool from './dialogs/Delete';


type Props = {
  tool: ToolLinkBase64Image
};


const Tool: FC<Props> = ({tool}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const isAdmin = user.role === roles.campusBoosterAdmin;


  return (
    <div className={isAdmin ? 'tool tool__admin' : 'tool'}>
      <ButtonBase
        component="a" href={tool.url}
        target="_blank" rel="noreferrer"
      >
        <div className="tool__header">
          <img src={tool.imgBase64 || '/assets/images/tools/tool.svg'} alt="logo"/>
        </div>

        <div className="tool__content">
          <h2 title={tool.title}>
            {tool.title}
          </h2>
          <p title={tool.description}>{tool.description || t('tools.no_description')}</p>
        </div>
      </ButtonBase>

      {user.role === roles.campusBoosterAdmin && (
        <Box className="edit-delete-tool">
          <IconButton color="primary" onClick={() => setOpenUpdate(true)}>
            <Edit/>
          </IconButton>

          <IconButton color="error" onClick={() => setOpenDelete(true)}>
            <Delete/>
          </IconButton>
        </Box>
      )}

      <UpdateTool tool={tool} open={openUpdate} setOpen={setOpenUpdate}/>
      <DeleteTool tool={tool} open={openDelete} setOpen={setOpenDelete}/>
    </div>
  );
};


export default Tool;
