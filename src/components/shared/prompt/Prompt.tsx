import { FC } from 'react';


type Props = {
  animated?: boolean,
  children: React.ReactNode
};

type DivProps = React.HTMLAttributes<HTMLDivElement> & Props;
type FormProps = React.HTMLAttributes<HTMLFormElement> & Props;


export const DivPrompt: FC<DivProps> = ({children, animated}) => {
  const classes = `prompt__container ${animated ? 'animated' : ''}`.trimEnd();

  return (
    <form className={classes}>
      {children}
    </form>
  );
};

export const FormPrompt: FC<FormProps> = ({children, animated, onSubmit}) => {
  const classes = `prompt__container ${animated ? 'animated' : ''}`.trimEnd();

  return (
    <form className={classes} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
