import { FC, useEffect } from 'react';

import { handlePromptScrollShadow } from '../../../shared/functions';


type Props = {
  column?: boolean,
  children: React.ReactNode
};


const PromptActions: FC<Props> = ({children, column}) => {
  const classes = `prompt__actions flexRow ${column ? 'column' : ''}`.trimEnd();

  useEffect(() => {
    handlePromptScrollShadow(true);
  }, []);


  return (
    <div className={classes}>
      {children}
    </div>
  );
};


export default PromptActions;
