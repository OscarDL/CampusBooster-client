import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Button, Divider } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';

import { ContentHeader } from '../../../../../../shared/content';
import { useAppSelector } from '../../../../../../../store/store';
import { Classroom } from '../../../../../../../shared/types/classroom';
import { getLoggedInAuthState, userHasAdminRights } from '../../../../../../../shared/functions';

import ProjectsLine from './Line';
import CreateProject from './dialogs/Create';
import Container from '../../../../../../shared/container';


type Props = {
  classroom: Classroom | undefined
};


const ProjectsList: FC<Props> = ({classroom}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { projectsList } = useAppSelector(state => state.projects);

  const [openCreate, setOpenCreate] = useState(false);

  const projects = useMemo(() => {
    return (projectsList ?? []).filter(project => (
      project.ClassroomHasCourse.classroomId === classroom?.id
    ));
  }, [classroom, projectsList]);


  const itemRefs: {[key: number]: HTMLLIElement | null} = useMemo(() => ({}), []);

  useEffect(() => {
    const item = projects.find(project => (
      dayjs(project.endDate).add(1, 'day').isAfter(dayjs(), 'day')
    ));

    if (item) itemRefs[item.id]?.scrollIntoView();
  }, [itemRefs, projects]);


  return (
    <Container className="details">
      <ContentHeader title={t('planning.projects.title')}>
        {(userHasAdminRights(user.role) && classroom) && (
          <Button
            className="button"
            onClick={() => setOpenCreate(true)}
            startIcon={<span className="material-icons">add_circle_outline</span>}
          >
            {t('admin.projects.create.button')}
          </Button>
        )}
      </ContentHeader>

      <Divider sx={{mb: '1rem'}}/>

      {classroom ? (
        projects.length > 0 ? (
          <ul className="details__list">
            {projects.map((project, key) => (
              <li
                key={key}
                className="details__item"
                ref={el => (itemRefs[project.id] = el)}
              >
                <ProjectsLine classroom={classroom} project={project}/>
              </li>
            ))}
          </ul>
        ) : (
          <div className="details__empty">
            <h2>{t('planning.projects.none')}</h2>
          </div>
        )
      ) : (
        <div className="details__empty">
          <h2>{t('admin.plannings.select_classroom')}</h2>
        </div>
      )}

      <CreateProject classroom={classroom} open={openCreate} setOpen={setOpenCreate}/>
    </Container>
  );
};


export default ProjectsList;
