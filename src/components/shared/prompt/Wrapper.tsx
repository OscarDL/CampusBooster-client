import { FC } from 'react';


type Props = {
  children: JSX.Element
};

const PromptWrapper: FC<Props> = ({children}) => (
  <div className="prompt__wrapper">
    {children}
  </div>
);


export default PromptWrapper;
