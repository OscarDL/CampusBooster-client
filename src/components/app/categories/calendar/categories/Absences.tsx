import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../../../shared/content';

import Container from '../../../../shared/container';


const Absences: FC = () => {
  const { t } = useTranslation();


  return (
    <Container className="absences">
      <ContentHeader title={t('calendar.absences.title')}/>

      Calendar of past absences
    </Container>
  );
};


export default Absences;
