import { BeatLoader } from 'react-spinners';

import { colors } from '../../shared/utils';


function Loader({fullscreen = false}) {
  return (
    <div className={'loader ' + (fullscreen ? 'fullscreen' : '')}>
      <BeatLoader color={colors.loader}/>
    </div>
  );
};


export default Loader;
