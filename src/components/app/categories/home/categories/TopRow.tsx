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
          <strong>{summary.campus}</strong>
          <p>{t('home.top_row.campus')}</p>
        </div>
        <span className="top-info-card__icon material-icons-outlined">home_work</span>
      </div>

      <div className="top-info-card">
        <div className="top-info-card__title">
          <strong>{summary.courses}</strong>
          <p>{t('home.top_row.courses')}</p>
        </div>
        <span className="top-info-card__icon material-icons-outlined">auto_stories</span>
      </div>

      <div className="top-info-card">
        <div className="top-info-card__title">
          <strong>{summary.students}</strong>
          <p>{t('home.top_row.students')}</p>
        </div>
        <span className="top-info-card__icon material-icons-outlined">person_pin</span>
      </div>

      {summary.contracts ? (
        <div className="top-info-card">
          <div className="top-info-card__title">
            <strong>{summary.contracts}</strong>
            <p>{t('home.top_row.contracts')}</p>
          </div>
          <span className="top-info-card__icon material-icons-outlined">work_outline</span>
        </div>
      ) : null}

      {user.credits ? (
        <div className="top-info-card">
          <div className="top-info-card__title">
            <strong>{user.credits}</strong>
            <p>{t('home.top_row.total_credits')}</p>
          </div>
          <span className="top-info-card__icon material-icons-outlined">assignment_turned_in</span>
        </div>
      ) : null}
    </div>
  );
};


export default TopRow;