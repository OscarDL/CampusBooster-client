import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ListItemButton, ListItemText } from '@mui/material';


type Props = {
  text?: string,
  category: string,
  expanded?: boolean,
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
};


function NavItem({text, category, expanded = true, onClick = () => null}: Props) {
  const { t } = useTranslation();

  return (
    <Link
      onClick={onClick}
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
