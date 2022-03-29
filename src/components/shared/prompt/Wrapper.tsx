import { FC, useEffect } from 'react';

import { handlePromptScrollShadow } from '../../../shared/functions';


type Props = {
  children: React.ReactNode
};


export const PromptWrapper: FC<Props> = ({children}) => {
  useEffect(() => {
    window.addEventListener('resize', () => handlePromptScrollShadow(false));
    return () => window.removeEventListener('resize', () => handlePromptScrollShadow(false));
  }, []);

  return (
    <div className="prompt__wrapper" onScroll={() => handlePromptScrollShadow(false)}>
      {children}
    </div>
  );
};

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
