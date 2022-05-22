import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { FakeProject } from '../../../../../../shared/types/course';

import ProjectDetails from './Details';


type Props = {
  project: FakeProject
};


const ProjectsLine: FC<Props> = ({project}) => {
  const { t } = useTranslation();
  const [details, setDetails] = useState<FakeProject>();


  return (
    <li className={'details__item course-color-project'}>
      <span className="details__item__date">
        {`${t('planning.projects.for')} ${dayjs(project.dateEnd).format(t('global.date-mmmm-dd'))} ${t('global.colon')}`}
      </span>

      <span className="details__item__title">
        {project.title}
      </span>

      <span className="details__item__more">
        <Button onClick={() => setDetails(project)}>
          Expand
        </Button>
      </span>

      {<ProjectDetails project={project} open={!!details} setDetails={setDetails}/>}
    </li>
  );
};


export default ProjectsLine;
