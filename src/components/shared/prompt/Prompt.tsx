import './Prompt.css';


type Props = {
  animated: boolean,
  children: JSX.Element,
  style: React.CSSProperties
};


function Prompt({children, animated, style}: Props) {
  return (
    <div className={'prompt__backdrop ' + (animated ? 'animated' : '')} style={style}>
      {children}
    </div>
  );
};


export default Prompt;
