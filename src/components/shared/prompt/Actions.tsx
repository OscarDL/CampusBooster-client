import { FC } from 'react';


type Props = {
  column: string,
  children: JSX.Element
};

const PromptActions: FC<Props> = ({children, column}) => (
  <div className={'prompt__actions flexRow ' + (column ? 'column' : '')}>
    {children}
  </div>
);


export default PromptActions;
