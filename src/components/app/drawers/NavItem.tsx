import { FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ListItemButton, ListItemText } from '@mui/material';

import { setCategory } from '../../../store/features/app/slice';
import { getCategoryTitle } from '../../../shared/functions';


type Props = {
  text?: string,
  category: string,
  collapsed?: boolean,
  hideDrawer?: () => void
};


const NavItem: FC<Props> = ({text, category, collapsed = false, hideDrawer = () => null}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const icon = category + '.icon';
  const title = category + '.title';

  const handleTap = () => {
    hideDrawer();
    dispatch(setCategory(title));
  };

  const handleEnter = (e: any) => {
    // Allow keyboard navigation
    if (e.code === 'Enter' || e.code === 'Space') {
      linkRef.current?.click();
    }
  };


  return (
    <Link
      ref={linkRef}
      tabIndex={-1}
      onClick={handleTap}
      to={'/' + category}
      title={collapsed ? t(title) : ''}
      className={getCategoryTitle() === title ? 'selected' : ''}
    >
      <ListItemButton onClick={handleEnter} key={category} className="drawer__item">
        <span className="drawer__icon material-icons-round">
          {t(icon)}
        </span>

        <ListItemText className="drawer__text" style={{opacity: collapsed ? 0 : 1}}>
          {text ?? t(title)}
        </ListItemText>
      </ListItemButton>
    </Link>
  );
};


export default NavItem;
