import { FC } from 'react';


type Props = {
  column?: boolean,
  children: React.ReactNode
};


const PromptActions: FC<Props> = ({children, column}) => {
  const classes = `prompt__actions flexRow ${column ? 'column' : ''}`.trimEnd();

  return (
    <div className={classes}>
      {children}
    </div>
  );
};


export default PromptActions;
