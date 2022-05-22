import { FC } from 'react';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../../../../shared/content';
import { FakeProject } from '../../../../../../shared/types/course';

import ProjectsLine from './Line';
import Container from '../../../../../shared/container';


type Props = {
  projects: FakeProject[]
};


const Projects: FC<Props> = ({projects}) => {
  const { t } = useTranslation();


  return (
    <Container className="details">
      <ContentHeader title={t('planning.projects.title')}/>
      <Divider sx={{mb: '1rem'}}/>

      {projects.length > 0 ? (
        <ul className="details__list">
          {projects.map((project, key) => <ProjectsLine key={key} project={project}/>)}
        </ul>
      ) : (
        <div className="details__empty">
          <h2>{t('planning.projects.none')}</h2>
        </div>
      )}
    </Container>
  );
};


export default Projects;
