import { FC } from 'react';

import './Container.css';


type Props = {
  rounded?: boolean,
  className?: string,
  children: React.ReactNode
};


const Container: FC<Props> = ({children, className, rounded = true}) => {
  const classes = `container ${rounded ? 'rounded' : ''} ${className ?? ''}`.trimEnd();

  return (
    <div className={classes}>
      {children}
    </div>
  );
};


export default Container;
