import { FC } from 'react';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../../../shared/content';
import { Task } from '../../../../../shared/types/calendar';

import DetailsLine from './DetailsLine';
import Container from '../../../../shared/container';


type Props = {
  tasks: Task[]
};


const Homework: FC<Props> = ({tasks}) => {
  const { t } = useTranslation();


  return (
    <Container className="details">
      <ContentHeader title={t('calendar.homework.title')}/>
      <Divider sx={{mb: '1rem'}}/>

      {tasks.length > 0 ? (
        <ul className="details__list">
          {tasks.map((task, key) => <DetailsLine key={key} course={{...task.course, type: 'today'}}/>)}
        </ul>
      ) : (
        <div className="details__empty">
          <h2>{t('calendar.homework.none')}</h2>
        </div>
      )}
    </Container>
  );
};


export default Homework;
