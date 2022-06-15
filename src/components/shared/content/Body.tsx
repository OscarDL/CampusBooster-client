import { FC, useEffect } from 'react';

import { handleHeaderScrollShadow } from '../../../shared/functions';


type Props = {
  id?: string,
  className?: string,
  children: React.ReactNode
};


const Body: FC<Props> = ({id, className, children}) => {
  const classes = `content__body ${className ?? ''}`.trimEnd();

  useEffect(() => {
    window.addEventListener('resize', handleHeaderScrollShadow);
    return () => window.removeEventListener('resize', handleHeaderScrollShadow);
  }, []);

  return (
    <div id={id} className={classes} onScroll={handleHeaderScrollShadow}>
      {children}
    </div>
  );
};


export default Body;
