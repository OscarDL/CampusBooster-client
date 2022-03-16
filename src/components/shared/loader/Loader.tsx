import { FC } from 'react';
import { BeatLoader } from 'react-spinners';

import './Loader.css';
import { colors } from '../../../shared/utils';


type Props = {
  fullscreen?: boolean
};

const Loader: FC<Props> = ({fullscreen}) => (
  <div className={'loader ' + (fullscreen ? 'fullscreen' : '')}>
    <BeatLoader color={colors.loader}/>
  </div>
);


export default Loader;
