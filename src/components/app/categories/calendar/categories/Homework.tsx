import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../../../shared/content';

import Container from '../../../../shared/container';


const Homework: FC = () => {
  const { t } = useTranslation();


  return (
    <Container className="homework">
      <ContentHeader title={t('calendar.homework.title')}/>

      List of homework tasks
    </Container>
  );
};


export default Homework;
