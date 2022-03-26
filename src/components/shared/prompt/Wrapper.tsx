import { FC } from 'react';


type Props = {
  children: React.ReactNode
};

const PromptWrapper: FC<Props> = ({children}) => (
  <div className="prompt__wrapper">
    {children}
  </div>
);


export default PromptWrapper;
