import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Summary } from '../../../../../shared/types/home';
import { useAppSelector } from '../../../../../store/store';
import { getLoggedInAuthState } from '../../../../../shared/functions';


type Props = {
  summary: Summary
};


const TopRow: FC<Props> = ({summary}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);


  return (
    <div className="top-grid">
      <div className="top-info-card">
        <div className="top-info-card__title">
          <p>{t('home.top_row.campus')}</p>
          <strong>{summary.campus}</strong>
        </div>
        <span className="top-info-card__icon material-icons-outlined">home_work</span>
      </div>

      <div className="top-info-card">
        <div className="top-info-card__title">
          <p>{t('home.top_row.courses')}</p>
          <strong>{summary.courses}</strong>
        </div>
        <span className="top-info-card__icon material-icons-outlined">auto_stories</span>
      </div>

      <div className="top-info-card">
        <div className="top-info-card__title">
          <p>{t('home.top_row.students')}</p>
          <strong>{summary.students}</strong>
        </div>
        <span className="top-info-card__icon material-icons-outlined">person_pin</span>
      </div>

      {summary.contracts && summary.contracts >= 0 ? (
        <div className="top-info-card">
          <div className="top-info-card__title">
            <p>{t('home.top_row.contracts')}</p>
            <strong>{summary.contracts}</strong>
          </div>
          <span className="top-info-card__icon material-icons-outlined">work_outline</span>
        </div>
      ) : null}

      {user.credits ? (
        <div className="top-info-card">
          <div className="top-info-card__title">
            <p>{t('home.top_row.total_credits')}</p>
            <strong>{user.credits}</strong>
          </div>
          <span className="top-info-card__icon material-icons-outlined">assignment_turned_in</span>
        </div>
      ) : null}
    </div>
  );
};


export default TopRow;
