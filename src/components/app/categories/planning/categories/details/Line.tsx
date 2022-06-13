import dayjs from 'dayjs';
import { FC } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { OpenInNewRounded } from '@mui/icons-material';

import { Planning, PlanningPeriod, PlanningType } from '../../../../../../shared/types/planning';


type Props = {
  planning: Planning
};


const DetailsLine: FC<Props> = ({planning}) => {
  const { t } = useTranslation();
  const course = planning.ClassroomHasCourse.Course;
  const past = dayjs(planning.date).isBefore(dayjs(), 'day');
  const period = t('planning.details.period.' + planning.period.toLowerCase());

  const textPeriod = planning.period !== PlanningPeriod.FullDay ? period : '';
  const textRemote = planning.remote ? t('planning.details.remote').toLowerCase() : '';


  const courseType = (date: string): string => {
    if (dayjs().isSame(date, 'day')) return PlanningType.Today.toLowerCase();
    return planning.type.toLowerCase();
  };

  const getDetails = (): string => {
    if (textPeriod && textRemote) return ` (${textPeriod}, ${textRemote})`;
    if (textPeriod) return ` (${textPeriod})`;
    if (textRemote) return ` (${textRemote})`;
    return '';
  };


  return (
    <div className={`course-color-${courseType(planning.date)}${past ? ' past' : ''}`}>
      <p className="details__item__date">
        {`${dayjs(planning.date).format(t('global.date.mmmm-dd'))}`}
        {getDetails()}
        {t('global.colon')}
      </p>

      &nbsp;<p
        title={planning.cancelled ? t('planning.details.cancelled') : ''}
        className={'details__item__title' + (planning.cancelled ? ' cancelled' : '')}
      >
        {course?.name} <span>&ndash; {course?.description}</span>
      </p>

      <p className="details__item__more">
        <Button color="primary" onClick={() => window.open(course?.link, '_blank')}>
          <OpenInNewRounded/>
        </Button>
      </p>
    </div>
  );
};


export default DetailsLine;
