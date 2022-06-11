import { FC, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { handleHeaderScrollShadow } from '../../../shared/functions';


type Props = {
  title: string,
  backButton?: boolean,
  children?: React.ReactNode
};


const Header: FC<Props> = ({backButton, children, title}) => {
  const navigate = useNavigate();

  useEffect(() => {
    handleHeaderScrollShadow();
  }, []);


  return (
    <div className="content__header">
      <div className="flex flex-align">
        {backButton && (
          <IconButton
            onClick={() => navigate('..')}
            color="primary" sx={{mb: '-2px'}}
          >
            <span className="material-icons-round">arrow_back_ios_new</span>
          </IconButton>
        )}
        <h2>{title}</h2>
      </div>

      <div className="options">
        {children}
      </div>
    </div>
  );
};


export default Header;
