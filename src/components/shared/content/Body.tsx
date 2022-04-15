import { FC } from 'react';


type Props = {
  className?: string,
  children: React.ReactNode
};


const Body: FC<Props> = ({className, children}) => {
  const classes = `content__body ${className ?? ''}`.trimEnd();

  return (
    <div className={classes}>
      {children}
    </div>
  );
};


export default Body;
