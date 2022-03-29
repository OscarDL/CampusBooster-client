import { FC } from 'react';
import { RotateLoader } from 'react-spinners';

import { colors } from '../../../shared/utils';

import './Loader.css';


type Props = {
  fullscreen?: boolean
};

const Loader: FC<Props> = ({fullscreen}) => (
  <div className={'loader ' + (fullscreen ? 'fullscreen' : '')}>
    <RotateLoader color={colors.loader}/>
  </div>
);


export default Loader;
