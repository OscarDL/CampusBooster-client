import { FC } from 'react';
import { RotateLoader } from 'react-spinners';

import { colors } from '../../../shared/utils';

import './Loader.css';


type Props = {
  fullsize?: boolean,
  fullscreen?: boolean
};


const Loader: FC<Props> = ({fullsize, fullscreen}) => {
  const classes = `loader ${fullsize ? 'fullsize' : ''} ${fullscreen ? 'fullscreen' : ''}`.trimEnd();

  return (
    <div className={classes}>
      <RotateLoader color={colors.accent}/>
    </div>
  );
};


export default Loader;
