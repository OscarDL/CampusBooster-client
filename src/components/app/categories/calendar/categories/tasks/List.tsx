import { FC } from 'react';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../../../../shared/content';
import { Task } from '../../../../../../shared/types/calendar';

import TasksLine from './Line';
import Container from '../../../../../shared/container';


type Props = {
  tasks: Task[]
};


const Tasks: FC<Props> = ({tasks}) => {
  const { t } = useTranslation();


  return (
    <Container className="details">
      <ContentHeader title={t('calendar.tasks.title')}/>
      <Divider sx={{mb: '1rem'}}/>

      {tasks.length > 0 ? (
        <ul className="details__list">
          {tasks.map((task, key) => <TasksLine key={key} task={task}/>)}
        </ul>
      ) : (
        <div className="details__empty">
          <h2>{t('calendar.tasks.none')}</h2>
        </div>
      )}
    </Container>
  );
};


export default Tasks;
