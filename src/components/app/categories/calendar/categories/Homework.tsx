import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../../../shared/content';
import { Course } from '../../../../../shared/types/course';

import Container from '../../../../shared/container';


type Props = {
  courses: Course[]
};


const Homework: FC<Props> = ({courses}) => {
  const { t } = useTranslation();


  return (
    <Container className="homework">
      <ContentHeader title={t('calendar.homework.title')}/>

      List of homework tasks
      {courses.map((course, key) => <h1 key={key}>{course.title}</h1>)}
    </Container>
  );
};


export default Homework;
