import { FC } from 'react';
import { RotateLoader } from 'react-spinners';

import { colors } from '../../../shared/utils/values';
import { useAppSelector } from '../../../store/store';
import { getCurrentTheme } from '../../../shared/functions';

import './Loader.css';


type Props = {
  fullSize?: boolean,
  fullScreen?: boolean,
  clickThrough?: boolean
};


const Loader: FC<Props> = ({fullSize, fullScreen, clickThrough}) => {
  const { settings } = useAppSelector(state => state.app);
  const mode = getCurrentTheme(settings.theme);

  const classes = ('loader ' +
                  (fullSize ? 'full-size ' : '') +
                  (fullScreen ? 'full-screen ' : '') +
                  (clickThrough ? 'click-through' : ''))
                  .trimEnd();

  return (
    <div className={classes}>
      <RotateLoader color={colors.accent(mode)}/>
    </div>
  );
};


export default Loader;
