import dayjs from 'dayjs';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useMemo } from 'react';

import { ContentHeader } from '../../../../../shared/content';
import { useAppSelector } from '../../../../../../store/store';

import DetailsLine from './Line';
import Container from '../../../../../shared/container';


type Props = {
  date: dayjs.Dayjs | null
};


const DetailsList: FC<Props> = ({date}) => {
  const { t } = useTranslation();
  const { planningsList } = useAppSelector(state => state.plannings);

  const plannings = useMemo(() => {
    const plannings = planningsList?.slice()?.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
    return plannings?.filter(planning => dayjs(planning.date).isSame(date, 'month')) ?? [];
  }, [planningsList, date]);


  const itemRefs: {[key: number]: HTMLLIElement | null} = useMemo(() => ({}), []);

  useEffect(() => {
    const item = plannings.find(planning => (
      dayjs(planning.date).add(1, 'day').isAfter(date, 'day')
    ));

    if (item) itemRefs[item.id]?.scrollIntoView();
  }, [date, itemRefs, plannings]);


  return (
    <Container className="details">
      <ContentHeader title={t('planning.details.title')}/>
      <Divider sx={{mb: '1rem'}}/>

      {plannings.length > 0 ? (
        <ul className="details__list">
          {plannings.map((planning, key) => (
            <li
              key={key}
              className="details__item"
              ref={el => (itemRefs[planning.id] = el)}
            >
              <DetailsLine planning={planning}/>
            </li>
          ))}
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
