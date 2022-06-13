import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import { useTranslation } from 'react-i18next';


type Props = {
  to: string,
  icon: string,
  title: string,
  details: string
};


const AdminLink: FC<Props> = ({to, icon, title, details}) => {
  const { t } = useTranslation();

  return (
    <Link to={to} className="admin-link">
      <ButtonBase>
        <div className="admin-link__header">
          <span className="material-icons-outlined">{icon}</span>
        </div>

        <div className="admin-link__content">
          <h2>{title}</h2>
          <p title={details}>{details || t('admin.links.no_details')}</p>
        </div>
      </ButtonBase>
    </Link>
  );
};


export default AdminLink;
