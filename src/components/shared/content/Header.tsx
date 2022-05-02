import { FC, useEffect } from 'react';

import { handleHeaderScrollShadow } from '../../../shared/functions';


type Props = {
  title: string,
  children?: React.ReactNode
};


const Header: FC<Props> = ({children, title}) => {
  useEffect(() => {
    handleHeaderScrollShadow();
  }, []);

  return (
    <div className="content__header">
      <h2>{title}</h2>

      <div className="options">
        {children}
      </div>
    </div>
  );
};


export default Header;
