import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import TaskDetails from './Details';
import { Task } from '../../../../../../shared/types/calendar';


type Props = {
  task: Task
};


const TasksLine: FC<Props> = ({task}) => {
  const { t } = useTranslation();
  const [details, setDetails] = useState<Task>();


  return (
    <li className={'details__item course-color-task'}>
      <span className="details__item__date">
        {`${t('calendar.tasks.for')} ${dayjs(task.dateEnd).format(t('global.date-mmmm-dd'))} ${t('global.colon')}`}
      </span>

      <span className="details__item__title">
        {task.title}
      </span>

      <span className="details__item__more">
        <Button onClick={() => setDetails(task)}>
          Expand
        </Button>
      </span>

      {details && <TaskDetails task={task} setDetails={setDetails}/>}
    </li>
  );
};


export default TasksLine;
