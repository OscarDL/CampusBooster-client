import { FC } from 'react';
import { Divider } from '@mui/material';


type Props = {
  title: string,
  children?: React.ReactNode
};


const Header: FC<Props> = ({children, title}) => (
  <>
    <div className="content__header">
      <h2>{title}</h2>

      <div className="options">
        {children}
      </div>
    </div>

    <Divider/>
  </>
);


export default Header;
