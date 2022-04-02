import { ButtonBase } from '@mui/material';
import React, { FC, useEffect, useRef } from 'react';

import './Dropdown.css';


type Props = {
  id: string,
  icon?: string,
  title: string,
  children: React.ReactNode
};


const Dropdown: FC<Props> = ({id, icon, title, children}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Close dropdown when clicking outside of the component 
    const closeDropdown = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        document.querySelector('#' + id)?.classList.remove('open');
      }
    }

    document.addEventListener('mousedown', closeDropdown);

    return () => document.removeEventListener('mousedown', closeDropdown);
  }, [dropdownRef, id]);


  return (
    <div className="dropdown" ref={dropdownRef}>
      <ul className="dropdown__list" id={id}>
        {React.Children.map(children, item => <li>{item}</li>)}
      </ul>

      <ButtonBase
        component="div"
        classes={{root: 'dropdown__content'}}
        onClick={() => document.querySelector('#' + id)?.classList.toggle('open')}
      >
        <span className="dropdown__open material-icons-outlined dropdown__icon">{icon ?? id}</span>
        <span className="dropdown__open dropdown__title">{title}</span>
        <span className="dropdown__open material-icons-round dropdown__arrow">expand_more</span>
      </ButtonBase>
    </div>
  );
};


export default Dropdown;
