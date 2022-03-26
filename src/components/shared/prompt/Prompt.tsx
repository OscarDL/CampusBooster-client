import { FC } from 'react';

import './Prompt.css';


type Props = {
  animated?: boolean,
  children: JSX.Element,
  style?: React.CSSProperties
};

const Prompt: FC<Props> = ({children, animated, style}) => (
  <div className={'prompt__backdrop ' + (animated ? 'animated' : '')} style={style ?? {}}>
    {children}
  </div>
);


export default Prompt;
