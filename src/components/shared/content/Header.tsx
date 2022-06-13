import { FC, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { handleHeaderScrollShadow } from '../../../shared/functions';


type Props = {
  title: string,
  backButton?: boolean,
  children?: React.ReactNode,
  underHeaderComponent?: React.ReactNode
};


const Header: FC<Props> = ({backButton, children, title, underHeaderComponent}) => {
  const navigate = useNavigate();

  useEffect(() => {
    handleHeaderScrollShadow();
  }, []);


  return (
    <div className="content__header">
      <div className="content__header-top">
        <div className="flex flex-align" style={{overflow: 'hidden'}}>
          {backButton && (
            <IconButton sx={{my: '-1px'}} onClick={() => navigate('..')}>
              <span className="material-icons-round">arrow_back_ios_new</span>
            </IconButton>
          )}
          <h2>{title}</h2>
        </div>

        <div className="options">
          {children}
        </div>
      </div>

      {underHeaderComponent}
    </div>
  );
};


export default Header;
