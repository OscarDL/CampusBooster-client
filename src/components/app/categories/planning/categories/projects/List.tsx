import dayjs from 'dayjs';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useMemo } from 'react';

import { ContentHeader } from '../../../../../shared/content';
import { useAppSelector } from '../../../../../../store/store';

import ProjectsLine from './Line';
import Container from '../../../../../shared/container';


const ProjectsList: FC = () => {
  const { t } = useTranslation();
  const { projectsList } = useAppSelector(state => state.projects);


  const itemRefs: {[key: number]: HTMLLIElement | null} = useMemo(() => ({}), []);

  useEffect(() => {
    const item = (projectsList ?? []).find(project => (
      dayjs(project.endDate).add(1, 'day').isAfter(dayjs(), 'day')
    ));

    if (item) itemRefs[item.id]?.scrollIntoView();
  }, [itemRefs, projectsList]);


  return (
    <Container className="details">
      <ContentHeader title={t('planning.projects.title')}/>
      <Divider sx={{mb: '1rem'}}/>

      {projectsList ? (
        <ul className="details__list">
          {projectsList.map((project, key) => (
            <li
              key={key}
              className="details__item"
              ref={el => (itemRefs[project.id] = el)}
            >
              <ProjectsLine project={project}/>
            </li>
          ))}
        </ul>
      ) : (
        <div className="details__empty">
          <h2>{t('planning.projects.none')}</h2>
        </div>
      )}
    </Container>
  );
};


export default ProjectsList;
