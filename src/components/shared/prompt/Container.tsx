import { FC } from 'react';


type Props = {
  animated?: boolean,
  type: 'div' | 'form',
  children: JSX.Element,
  onSubmit?: React.FormEventHandler<HTMLFormElement>
};

const PromptActions: FC<Props> = ({children, animated, type, onSubmit}) => (
  type === 'div' ? (
    <div className={'prompt__container' + (animated ? ' animated' : '')}>
      {children}
    </div>
  ) : (
    <form className={'prompt__container' + (animated ? ' animated' : '')} onSubmit={onSubmit}>
      {children}
    </form>
  )
);


export default PromptActions;
