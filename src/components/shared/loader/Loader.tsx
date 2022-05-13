import { FC } from 'react';
import { RotateLoader } from 'react-spinners';

import { colors } from '../../../shared/utils/values';

import './Loader.css';


type Props = {
  fullSize?: boolean,
  fullScreen?: boolean,
  clickThrough?: boolean
};


const Loader: FC<Props> = ({fullSize, fullScreen, clickThrough}) => {
  const classes = ('loader ' +
                  (fullSize ? 'full-size ' : '') +
                  (fullScreen ? 'full-screen ' : '') +
                  (clickThrough ? 'click-through' : ''))
                  .trimEnd();

  return (
    <div className={classes}>
      <RotateLoader color={colors.accent}/>
    </div>
  );
};


export default Loader;
