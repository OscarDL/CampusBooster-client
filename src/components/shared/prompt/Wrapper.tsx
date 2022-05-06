import { FC } from 'react';


type PropsWrapper = {
  children: React.ReactNode
};

type PropsTitle = {
  title: string,
  children?: React.ReactNode
};

type PropsContent = {
  centered?: boolean,
  children: React.ReactNode
};


export const PromptWrapper: FC<PropsWrapper> = ({children}) => (
  <div className="prompt__wrapper">
    {children}
  </div>
);

export const PromptTitle: FC<PropsTitle> = ({children, title}) => (
  <div className="prompt__title">
    <h1>{title}</h1>
    {children}
  </div>
);

export const PromptContent: FC<PropsContent> = ({children, centered}) => (
  <div className="prompt__content" style={{alignItems: centered ? 'center' : 'flex-start'}}>
    {children}
  </div>
);
