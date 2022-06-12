import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';

import { Classroom } from '../../../../../../../shared/types/classroom';
import { Planning, PlanningPeriod, PlanningType } from '../../../../../../../shared/types/planning';

import UpdatePlanningEntry from './dialogs/Update';
import DeletePlanningEntry from './dialogs/Delete';


type Props = {
  planning: Planning,
  classroom: Classroom | undefined
};


const DetailsLine: FC<Props> = ({classroom, planning}) => {
  const { t } = useTranslation();

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

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
      <span className="details__item__date">
        {`${dayjs(planning.date).format(t('global.date.mmmm-dd'))}`}
        {getDetails()}
        {t('global.colon')}
      </span>

      &nbsp;<span
        title={!planning.cancelled ? t('admin.plannings.fields.cancelled') : ''}
        className={'details__item__title' + (planning.cancelled ? ' cancelled' : '')}
      >
        {course?.name} <span>&ndash; {course?.description}</span>
      </span>

      <span className="details__item__more">
        <Button color="primary" onClick={() => setOpenUpdate(true)}>
          <EditOutlined/>
        </Button>
        <Button color="error" onClick={() => setOpenDelete(true)}>
          <DeleteOutlined/>
        </Button>
      </span>

      <UpdatePlanningEntry classroom={classroom} planning={planning} open={openUpdate} setOpen={setOpenUpdate}/>
      <DeletePlanningEntry planning={planning} open={openDelete} setOpen={setOpenDelete}/>
    </div>
  );
};


export default DetailsLine;
