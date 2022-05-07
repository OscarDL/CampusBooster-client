import { FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ListItemButton, ListItemText } from '@mui/material';

import { setCategory } from '../../../store/features/app/slice';
import { getCategoryTitle, getLoggedInAuthState } from '../../../shared/functions';


type Props = {
  text?: string,
  category: string,
  collapsed?: boolean,
  hideDrawer?: () => void
};


const NavItem: FC<Props> = ({text, category, collapsed = false, hideDrawer = () => null}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector(getLoggedInAuthState);
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
      ref={linkRef} tabIndex={-1}
      title={collapsed ? t(title) : ''}
      onClick={handleTap} to={'/' + category}
      className={getCategoryTitle(user) === title ? 'selected' : ''}
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
