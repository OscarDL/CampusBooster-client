import { FC } from 'react';
import { Box, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../../../shared/content';
import { Summary } from '../../../../../shared/types/home';
import { colors } from '../../../../../shared/utils/values';

import Container from '../../../../shared/container';
import DetailsLine from '../../planning/categories/details/Line';


type Props = {
  summary: Summary
};


const Planning: FC<Props> = ({summary}) => {
  const { t } = useTranslation();

  return (
    <Container className="planning-view">
      <ContentHeader title={t('home.planning.title')}/>
      <Divider sx={{mb: '1rem', display: 'block !important'}}/>

      {(summary.upcomingCourses ?? []).length > 0 ? (
        // <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <ul className="details__list">
            {summary.upcomingCourses?.map((planning, key) => (
              <li key={key} className="details__item">
                <DetailsLine planning={planning}/>
              </li>
            ))}
          </ul>

          // <div className="calendar-picker-legend">
          //   {colors.calendarPicker.map(color => (
          //     <div key={color} style={{backgroundColor: `var(--course-color-${color})`}}>
          //       {t('planning.colors.' + color)}
          //     </div>
          //   ))}
          // </div>
        // </Box>
      ) : (
        <div className="details__empty">
          <h2>{t('home.planning.upcoming_empty')}</h2>
        </div>
      )}
    </Container>
  );
};


export default Planning;
