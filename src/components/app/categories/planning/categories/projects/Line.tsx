import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Project } from '../../../../../../shared/types/project';

import ProjectDetails from './Details';


type Props = {
  project: Project
};


const ProjectsLine: FC<Props> = ({project}) => {
  const { t } = useTranslation();
  const [details, setDetails] = useState<Project>();


  return (
    <div className="course-color-project">
      <span className="details__item__date">
        {`${t('planning.projects.for')} ${dayjs(project.endDate).format(t('global.date.mmmm-dd'))} ${t('global.colon')}`}
      </span>

      <span className="details__item__title">
        &nbsp;{project.ClassroomHasCourse.Course?.name} - {project.title}
      </span>

      <span className="details__item__more">
        <Button onClick={() => setDetails(project)}>
          Expand
        </Button>
      </span>

      {<ProjectDetails project={project} open={!!details} setDetails={setDetails}/>}
    </div>
  );
};


export default ProjectsLine;
