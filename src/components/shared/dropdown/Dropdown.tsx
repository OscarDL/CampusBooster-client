import React, { FC, useEffect } from 'react';

import './Dropdown.css';


type Props = {
  id: string,
  icon?: string,
  title: string,
  children: React.ReactNode
};


const Loader: FC<Props> = ({id, icon, title, children}) => {
  useEffect(() => {
    const dropdown = (e: any) => {
      if (!e.target.className.includes('dropdown')) {
        document.querySelector('#' + id)?.classList.remove('open');
      }
    };
    document.addEventListener('click', dropdown);

    return () => document.removeEventListener('click', dropdown);
  }, [id]);


  return (
    <div className="dropdown">
      <ul className="dropdown__list" id={id}>
        {React.Children.map(children, item => <li>{item}</li>)}
      </ul>

      <div className="dropdown__content" onClick={() => document.querySelector('#' + id)?.classList.toggle('open')}>
        <span className="dropdown__open material-icons-outlined dropdown__icon">{icon ?? id}</span>
        <span className="dropdown__open dropdown__title">{title}</span>
        <span className="dropdown__open material-icons-round dropdown__arrow">expand_more</span>
      </div>
    </div>
  );
};


export default Loader;
