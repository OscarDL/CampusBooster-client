import dayjs from 'dayjs';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Planning, PlanningPeriod } from '../../../../../../shared/types/planning';


type Props = {
  planning: Planning
};


const DetailsLine: FC<Props> = ({planning}) => {
  const { t } = useTranslation();
  const course = planning.ClassroomHasCourse.Course;
  const period = t('planning.details.period.' + planning.period.toLowerCase());

  const courseType = (date: string): 'today' | undefined => {
    if (dayjs().isSame(date, 'day')) {
      return 'today'; // Show today's course in accent color
    }
  };


  return (
    <li className={'details__item course-color-' + (courseType(planning.date) ?? planning.type.toLowerCase())}>
      <span className="details__item__date">
        {`${dayjs(planning.date).format(t('global.date.mmmm-dd'))} ${t('global.colon')} `}
      </span>

      <span className="details__item__title">
        &nbsp;{course?.name} - {course?.description}
        {planning.period !== PlanningPeriod.FullDay ? ` (${period})` : ''}
      </span>
    </li>
  );
};


export default DetailsLine;
