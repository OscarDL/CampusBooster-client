type Props = {
  column: string,
  children: JSX.Element
};


function PromptActions({children, column}: Props) {

  return (
    <div className={'prompt__actions flexRow ' + (column ? 'column' : '')}>
      {children}
    </div>
  );
};


export default PromptActions;
