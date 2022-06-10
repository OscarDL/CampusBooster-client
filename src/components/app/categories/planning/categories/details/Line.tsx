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

  const courseType = (date: string): string => {
    if (dayjs().isSame(date, 'day')) {
      return PlanningType.Today.toLowerCase(); // Show today's course in accent color
    }
    return planning.type.toLowerCase();
  };


  return (
    <div className={`course-color-${courseType(planning.date)}${past ? ' past' : ''}`}>
      <span className="details__item__date">
        {`${dayjs(planning.date).format(t('global.date.mmmm-dd'))}`}
        {planning.period !== PlanningPeriod.FullDay ? ` (${period})` : ''}
        {t('global.colon')}
      </span>

      <span className="details__item__title">
        &nbsp;{course?.name} &ndash; {course?.description}
      </span>

      <span className="details__item__more">
        <Button color="primary" onClick={() => window.open(course?.link, '_blank')}>
          <OpenInNewRounded/>
        </Button>
      </span>
    </div>
  );
};


export default DetailsLine;
