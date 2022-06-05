import dayjs from 'dayjs';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FakeCourse } from '../../../../../../../shared/types/course';


type Props = {
  course: FakeCourse
};


const DetailsLine: FC<Props> = ({course}) => {
  const { t } = useTranslation();

  const courseType = (date: Date): 'today' | undefined => {
    if (date.setHours(0) === (new Date()).setHours(0)) {
      return 'today'; // Show today's course in a special (accent) color
    }
  };


  return (<>
    {course.dates?.map((date, key) => (
      <li key={key} className={'details__item course-color-' + (courseType(date) ?? course.type)}>
        <span className="details__item__date">
          {`${dayjs(date).format(t('global.date.mmmm-dd'))} ${t('global.colon')} `}
        </span>

        <span className="details__item__title">
          {course.name} - {course.title}
        </span>
      </li>
    ))}
  </>);
};


export default DetailsLine;
