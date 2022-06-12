import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';

import { Project } from '../../../../../../../shared/types/project';
import { Classroom } from '../../../../../../../shared/types/classroom';

import UpdateProject from './dialogs/Update';
import DeleteProject from './dialogs/Delete';


type Props = {
  project: Project,
  classroom: Classroom | undefined,
};


const ProjectsLine: FC<Props> = ({classroom, project}) => {
  const { t } = useTranslation();
  const past = dayjs(project.endDate).isBefore(dayjs(), 'day');

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);


  return (
    <div className={`course-color-project${past ? ' past' : ''}`}>
      <span className="details__item__date">
        {`${t('planning.projects.for')} ${dayjs(project.endDate).format(t('global.date.mmmm-dd'))} ${t('global.colon')}`}
      </span>

      <span className="details__item__title">
        &nbsp;{project.ClassroomHasCourse.Course?.name} <span>&ndash; {project.title}</span>
      </span>

      <span className="details__item__more">
        <Button color="primary" onClick={() => setOpenUpdate(true)}>
          <EditOutlined/>
        </Button>
        <Button color="error" onClick={() => setOpenDelete(true)}>
          <DeleteOutlined/>
        </Button>
      </span>

      <UpdateProject classroom={classroom} project={project} open={openUpdate} setOpen={setOpenUpdate}/>
      <DeleteProject project={project} open={openDelete} setOpen={setOpenDelete}/>
    </div>
  );
};


export default ProjectsLine;
