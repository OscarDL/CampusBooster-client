import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ListItemButton, ListItemText } from '@mui/material';

import { setCategory } from '../../../store/features/app/slice';


type Props = {
  text?: string,
  category: string,
  expanded?: boolean,
  hideDrawer?: () => void
};


const NavItem: FC<Props> = ({text, category, expanded = true, hideDrawer = () => null}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleTap = () => {
    hideDrawer();
    dispatch(setCategory(category + '.title'));
  };


  return (
    <Link
      onClick={handleTap}
      to={'/' + category}
      title={expanded ? '' : t(`${category}.title`)}
    >
      <ListItemButton key={category} className="drawer__item">
        <div className="drawer__icon">
          <span className="material-icons-round">
            {t(`${category}.icon`)}
          </span>
        </div>

        <ListItemText className="drawer__text" style={{opacity: expanded ? 1 : 0}}>
          {text ?? t(`${category}.title`)}
        </ListItemText>
      </ListItemButton>
    </Link>
  );
};


export default NavItem;
