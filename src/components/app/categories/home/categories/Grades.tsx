import { FC } from 'react';
import { Box, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../../../shared/content';
import { Summary } from '../../../../../shared/types/home';

import GradesLine from './GradesLine';
import Container from '../../../../shared/container';


type Props = {
  summary: Summary
};


const Grades: FC<Props> = ({summary}) => {
  const { t } = useTranslation();

  return (
    <Container className="home-grades">
      <ContentHeader title={t('home.grades.title')}/>
      <Divider sx={{mb: '1rem', display: 'block !important'}}/>

      {(summary.latestGrades ?? []).length > 0 ? (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <ul className="grades__list">
            {summary.latestGrades?.map((grade, key) => (
              <li key={key} className="grades__item">
                <GradesLine grade={grade}/>
              </li>
            ))}
          </ul>
        </Box>
      ) : (
        <div className="details__empty">
          <h2>{t('home.grades.none')}</h2>
        </div>
      )}
    </Container>
  );
};


export default Grades;
