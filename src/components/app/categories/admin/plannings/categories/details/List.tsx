import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Button, Divider } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';

import { ContentHeader } from '../../../../../../shared/content';
import { useAppSelector } from '../../../../../../../store/store';
import { Classroom } from '../../../../../../../shared/types/classroom';
import { getLoggedInAuthState, userHasAdminRights } from '../../../../../../../shared/functions';

import DetailsLine from './Line';
import CreatePlanningEntry from './dialogs/Create';
import Container from '../../../../../../shared/container';


type Props = {
  date: dayjs.Dayjs | null,
  classroom: Classroom | undefined
};


const DetailsList: FC<Props> = ({date, classroom}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { planningsList } = useAppSelector(state => state.plannings);

  const [openAdd, setOpenAdd] = useState(false);

  const plannings = useMemo(() => {
    const plannings = planningsList?.slice()?.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

    return (plannings ?? []).filter(planning => (
      dayjs(planning.date).isSame(date, 'month') && planning.ClassroomHasCourse.classroomId === classroom?.id
    ));
  }, [planningsList, classroom, date]);


  const itemRefs: {[key: number]: HTMLLIElement | null} = useMemo(() => ({}), []);

  useEffect(() => {
    const item = plannings.find(planning => (
      dayjs(planning.date).add(1, 'day').isAfter(dayjs(), 'day')
    ));

    if (item) itemRefs[item.id]?.scrollIntoView();
  }, [itemRefs, plannings]);


  return (
    <Container className="details">
      <ContentHeader title={t('planning.details.title')}>
        {(userHasAdminRights(user.role) && classroom) && (
          <Button
            className="button"
            onClick={() => setOpenAdd(true)}
            startIcon={<span className="material-icons">add_circle_outline</span>}
          >
            {t('admin.plannings.add.button')}
          </Button>
        )}
      </ContentHeader>

      <Divider sx={{mb: '1rem'}}/>

      {classroom ? (
        plannings.length > 0 ? (
          <ul className="details__list">
            {plannings.map((planning, key) => (
              <li
                key={key}
                className="details__item"
                ref={el => (itemRefs[planning.id] = el)}
              >
                <DetailsLine classroom={classroom} planning={planning}/>
              </li>
            ))}
          </ul>
        ) : (
          <div className="details__empty">
            <h2>{t('planning.details.none', {m: dayjs(date).format('MMMM')})}</h2>
          </div>
        )
      ) : (
        <div className="details__empty">
          <h2>{t('admin.plannings.select_classroom')}</h2>
        </div>
      )}

      <CreatePlanningEntry classroom={classroom} open={openAdd} setOpen={setOpenAdd}/>
    </Container>
  );
};


export default DetailsList;
