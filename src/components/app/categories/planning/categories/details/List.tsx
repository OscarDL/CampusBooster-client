import dayjs from 'dayjs';
import { FC } from 'react';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../../../../shared/content';
import { FakeCourse } from '../../../../../../shared/types/course';

import DetailsLine from './Line';
import Container from '../../../../../shared/container';


type Props = {
  courses: FakeCourse[],
  date: dayjs.Dayjs | null
};


const DetailsList: FC<Props> = ({courses, date}) => {
  const { t } = useTranslation();


  return (
    <Container className="details">
      <ContentHeader title={t('planning.details.title')}/>
      <Divider sx={{mb: '1rem'}}/>

      {courses.length > 0 ? (
        <ul className="details__list">
          {courses.map((course, key) => <DetailsLine key={key} course={course}/>)}
        </ul>
      ) : (
        <div className="details__empty">
          <h2>{t('planning.details.none', {m: dayjs(date).format('MMMM')})}</h2>
        </div>
      )}
    </Container>
  );
};


export default DetailsList;
