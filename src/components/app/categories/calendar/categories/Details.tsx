import { FC } from 'react';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../../../shared/content';
import { Course } from '../../../../../shared/types/course';

import DetailsLine from './DetailedLine';
import Container from '../../../../shared/container';


type Props = {
  courses: Course[]
};


const Details: FC<Props> = ({courses}) => {
  const { t } = useTranslation();


  return (
    <Container className="details">
      <ContentHeader title={t('calendar.details.title')}/>
      <Divider sx={{mb: '1rem'}}/>

      <ul className="details__list">
        {courses.map((course, key) => <DetailsLine key={key} course={course}/>)}
      </ul>
    </Container>
  );
};


export default Details;
