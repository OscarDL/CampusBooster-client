import dayjs from 'dayjs';
import { FC, useMemo } from 'react';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../../../../shared/content';
import { useAppSelector } from '../../../../../../store/store';
import { Project } from '../../../../../../shared/types/project';

import ProjectsLine from './Line';
import Container from '../../../../../shared/container';


const ProjectsList: FC = () => {
  const { t } = useTranslation();
  const { projectsList } = useAppSelector(state => state.projects);

  const projects = useMemo(() => {
    // Only return projects that have not yet met their deadline date
    const getDeadline = ({endDate}: Project) => dayjs(endDate).add(1, 'day');
    return (projectsList ?? []).filter(project => dayjs().isBefore(getDeadline(project), 'day'));
  }, [projectsList]);


  return (
    <Container className="details">
      <ContentHeader title={t('planning.projects.title')}/>
      <Divider sx={{mb: '1rem'}}/>

      {projects.length > 0 ? (
        <ul className="details__list">
          {projects.map((project, key) => (
            <li key={key} className="details__item">
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
