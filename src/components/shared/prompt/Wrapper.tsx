type Props = {
  children: JSX.Element
};


function PromptWrapper({children}: Props) {
  return (
    <div className="prompt__wrapper">
      {children}
    </div>
  );
};


export default PromptWrapper;
