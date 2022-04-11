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

  const toggleDropdown: React.MouseEventHandler<any> = () => (
    document.querySelector('#' + id)?.classList.toggle('open')
  );


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
      <ul className="dropdown__content" id={id}>
        {React.Children.map(children, item => (
          <ButtonBase component="li" onClick={toggleDropdown}>
            {item}
          </ButtonBase>
        ))}
      </ul>

      <ButtonBase
        component="div"
        onClick={toggleDropdown}
        classes={{root: 'dropdown__header'}}
      >
        <span className="dropdown__open material-icons-outlined dropdown__icon">{icon ?? id}</span>
        <span className="dropdown__open dropdown__title">{title}</span>
        <span className="dropdown__open material-icons-round dropdown__arrow">expand_more</span>
      </ButtonBase>
    </div>
  );
};


export default Dropdown;
