import { FC } from 'react';


type Props = {
  children: React.ReactNode
};


export const PromptWrapper: FC<Props> = ({children}) => (
  <div className="prompt__wrapper">
    {children}
  </div>
);

export const PromptTitle: FC<Props> = ({children}) => (
  <div className="prompt__title">
    {children}
  </div>
);

export const PromptContent: FC<Props & {centered?: boolean}> = ({children, centered}) => (
  <div className="prompt__content" style={{alignItems: centered ? 'center' : 'flex-start'}}>
    {children}
  </div>
);
