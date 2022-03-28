import { FC } from 'react';

import './Prompt.css';


type Props = {
  animated?: boolean,
  children: JSX.Element,

  className?: string,
  style?: React.CSSProperties
};


const Backdrop: FC<Props> = ({animated, children, className = '', style = {}}) => {
  const classes = `prompt__backdrop ${animated ? 'animated ' : ''} ${className}`.trimEnd();

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};


export default Backdrop;
