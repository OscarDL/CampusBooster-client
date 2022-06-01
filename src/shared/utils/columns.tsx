import dayjs from 'dayjs';
import { t } from 'i18next';
import { Dispatch, SetStateAction } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { DeleteOutlined, EditOutlined, OpenInNewRounded, RemoveCircleOutlineOutlined } from '@mui/icons-material';

import { Course } from '../types/course';
import { User, UserRoles } from '../types/user';
import { userHasAdminRights } from '../../shared/functions';
import { Classroom, ClassroomHasCourse, UserHasClassroom } from '../types/classroom';


type BaseProps = {
  user: User,
  setOpenUpdate: Dispatch<SetStateAction<boolean>>,
  setOpenDelete: Dispatch<SetStateAction<boolean>>,
  setSelectedRow: Dispatch<SetStateAction<any>>
};

type EditDeleteColumnProps = (props: Partial<BaseProps> & {allowed: boolean}) => GridColDef[];


const getEditDeleteColumn: EditDeleteColumnProps = ({allowed, setOpenUpdate, setOpenDelete, setSelectedRow}) => {
  if (!allowed) return [];

  return [{
    width: 100,
    sortable: false,
    field: 'actions',
    filterable: false,
    headerName: t('data_grid.actions'),

    renderCell: ({row}: GridRenderCellParams) => (
      <div>
        <Tooltip title={t('global.edit') ?? ''}>
          <IconButton
            color="primary"
            onClick={() => {
              setSelectedRow?.(row);
              setOpenUpdate?.(true);
            }}
          >
            <EditOutlined/>
          </IconButton>
        </Tooltip>

        <Tooltip title={t('global.delete') ?? ''}>
          <IconButton
            color="error"
            onClick={() => {
              setSelectedRow?.(row);
              setOpenDelete?.(true);
            }}
          >
            <DeleteOutlined/>
          </IconButton>
        </Tooltip>
      </div>
    )
  }]
};


export const getAccountingColumns = ({user, setOpenUpdate, setOpenDelete, setSelectedRow}: BaseProps): GridColDef[] => {
  const allowed = userHasAdminRights(user.role);
  const columnPrefix = 'accounting.data_grid.columns.';

  const userColumn: GridColDef[] = userHasAdminRights(user.role) ? (
    [{ field: 'studentName', headerName: t(columnPrefix + 'student'), width: 200 }]
  ) : (
    []
  );


  return [
    ...userColumn,
    {
      field: 'dateRequested', headerName: t(columnPrefix + 'date_requested'), width: 150,
      valueGetter: ({row}) => dayjs(row.dateRequested).format(t('global.date-mm-dd-yyyy'))
    },
    {
      field: 'dateConfirmed', headerName: t(columnPrefix + 'date_confirmed'), width: 150,
      valueGetter: ({row}) => row.dateConfirmed ? dayjs(row.dateConfirmed).format(t('global.date-mm-dd-yyyy')) : null
    },
    {
      field: 'description', headerName: t(columnPrefix + 'description'), width: 300
    },
    {
      field: 'debit', headerName: t(columnPrefix + 'debit'), width: 100
    },
    {
      field: 'credit', headerName: t(columnPrefix + 'credit'), width: 100
    },
    {
      field: 'status', headerName: t(columnPrefix + 'status'), width: 150, valueGetter: ({row}) => t('accounting.status.' + row.status)
    },
    ...getEditDeleteColumn({allowed, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};


export const getUsersColumns = ({user, setOpenUpdate, setOpenDelete, setSelectedRow}: BaseProps): GridColDef[] => {
  const allowed = userHasAdminRights(user.role);
  const columnPrefix = 'users.fields.';

  return [
    {
      field: 'role', headerName: t(columnPrefix + 'role'), width: 150, hideable: false,
      valueGetter: ({row}) => t(`users.${row.role.toLowerCase()}.title_role`)
    },
    {
      field: 'firstName', headerName: t(columnPrefix + 'first_name'), width: 125
    },
    {
      field: 'lastName', headerName: t(columnPrefix + 'last_name'), width: 125
    },
    {
      field: 'email', headerName: t(columnPrefix + 'email'), width: 300
    },
    {
      field: 'personalEmail', headerName: t(columnPrefix + 'personal_email'), width: 250
    },
    {
      field: 'birthday', headerName: t(columnPrefix + 'birthday'), width: 150, hide: true,
      valueGetter: ({row}) => dayjs(row.birthday).format(t('global.date-mm-dd-yyyy'))
    },
    {
      field: 'Campus', headerName: t(columnPrefix + 'campus'), width: 150, valueGetter: ({row}) => row.Campus?.name
    },
    {
      field: 'UserHasClassrooms', headerName: t(columnPrefix + 'classrooms'), width: 250,
      valueGetter: ({row}) => row.UserHasClassrooms.map((uhc: UserHasClassroom) => uhc.Classroom?.name).join(', ')
    },
    ...getEditDeleteColumn({allowed, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};


export const getBannedUsersColumns = ({setOpenDelete, setSelectedRow}: Partial<BaseProps>): GridColDef[] => {
  const columnPrefix = 'users.fields.';

  return [
    {
      field: 'role', headerName: t(columnPrefix + 'role'), width: 150,
      valueGetter: ({row}) => t(`users.${row.role.toLowerCase()}.title_role`)
    },
    {
      field: 'firstName', headerName: t(columnPrefix + 'first_name'), width: 125
    },
    {
      field: 'lastName', headerName: t(columnPrefix + 'last_name'), width: 125
    },
    {
      field: 'email', headerName: t(columnPrefix + 'email'), width: 300
    },
    {
      field: 'Campus', headerName: t(columnPrefix + 'campus'), width: 150, valueGetter: ({row}) => row.Campus?.name
    },
    {
      field: 'actions', headerName: t(columnPrefix + 'actions'), width: 100,
      renderCell: ({row}) => (
        <div>
          <IconButton
            color="error"
            onClick={() => {
              setSelectedRow?.(row);
              setOpenDelete?.(true);
            }}
          >
            <RemoveCircleOutlineOutlined/>
          </IconButton>
        </div>
      )
    }
  ];
};


export const getGradesColumns = ({user, setOpenUpdate, setOpenDelete, setSelectedRow}: BaseProps): GridColDef[] => {
  const allowed = user.role !== UserRoles.Student;
  const columnPrefix = 'grades.fields.';

  const userColumn: GridColDef[] = allowed ? (
    [{
      field: 'student', headerName: t(columnPrefix + 'student'), width: 200,
      valueGetter: ({row}) => `${row.User?.firstName} ${row.User?.lastName}`
    }]
  ) : (
    []
  );


  return [
    ...userColumn,
    {
      field: 'course', headerName: t(columnPrefix + 'course'), width: 100,
      valueGetter: ({row}) => row.ClassroomHasCourse?.Course?.name
    },
    {
      field: 'grade', headerName: t(columnPrefix + 'grade'), width: 100,
      valueGetter: ({row}) => `${row.average} / 20`
    },
    {
      field: 'comment', headerName: t(columnPrefix + 'comment'), width: 400
    },
    {
      field: 'teacher', headerName: t(columnPrefix + 'teacher'), width: 200,
      valueGetter: ({row}) => `${row.Teacher?.User?.firstName} ${row.Teacher?.User?.lastName}`
    },
    ...getEditDeleteColumn({allowed, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};


export const getCampusColumns = ({user, setOpenUpdate, setOpenDelete, setSelectedRow}: BaseProps): GridColDef[] => {
  const allowed = userHasAdminRights(user.role);
  const columnPrefix = 'admin.campus.fields.';

  return [
    {
      field: 'name', headerName: t(columnPrefix + 'name'), width: 200
    },
    {
      field: 'address', headerName: t(columnPrefix + 'address'), width: 300
    },
    {
      field: 'postCode', headerName: t(columnPrefix + 'post_code'), width: 100
    },
    {
      field: 'city', headerName: t(columnPrefix + 'city'), width: 200
    },
    {
      field: 'open', headerName: t(columnPrefix + 'open'), width: 100,
      valueGetter: ({row}) => t('global.' + (row.open ? 'yes' : 'no'))
    },
    {
      field: 'virtual', headerName: t(columnPrefix + 'virtual'), width: 100,
      valueGetter: ({row}) => t('global.' + (row.virtual ? 'yes' : 'no'))
    },
    ...getEditDeleteColumn({allowed, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};


export const getClassroomsColumns = ({user, setOpenUpdate, setOpenDelete, setSelectedRow}: BaseProps): GridColDef[] => {
  const allowed = userHasAdminRights(user.role);
  const columnPrefix = 'admin.classrooms.fields.';
  const getCourses = (row: Classroom) => row.ClassroomHasCourses?.map((chc: ClassroomHasCourse) => chc.Course?.name).join(', ');

  return [
    {
      field: 'campus', headerName: t(columnPrefix + 'campus'), width: 200,
      valueGetter: ({row}) => row.Campus?.name ?? t(columnPrefix + 'no_campus')
    },
    {
      field: 'name', headerName: t(columnPrefix + 'name'), width: 200
    },
    {
      field: 'promotion', headerName: t(columnPrefix + 'promotion'), width: 100
    },
    {
      field: 'courses', headerName: t(columnPrefix + 'courses'), width: 300, valueGetter: ({row}) => getCourses(row),
      renderCell: ({row}) => (
        <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}} title={getCourses(row)}>{getCourses(row)}</div>
      )
      
    },
    ...getEditDeleteColumn({allowed, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};


export const getCoursesColumns = ({user, setOpenUpdate, setOpenDelete, setSelectedRow}: BaseProps): GridColDef[] => {
  const allowed = userHasAdminRights(user.role);
  const columnPrefix = 'courses.fields.';

  const getCanvasLink = (link: Course['link']) => (
    <Button
      sx={{ml: '-10px'}}
      endIcon={<OpenInNewRounded/>}
      onClick={() => window.open(link, '_blank')}
    >
      {t(columnPrefix + 'link_field')}
    </Button>
  );


  return [
    {
      field: 'year', headerName: t(columnPrefix + 'year'), width: 150,
      valueGetter: ({row}) => t(columnPrefix + 'year_field', {year: row.year})
    },
    {
      field: 'name', headerName: t(columnPrefix + 'name'), width: 150
    },
    {
      field: 'description', headerName: t(columnPrefix + 'description'), width: 450
    },
    {
      field: 'link', headerName: t(columnPrefix + 'link'), width: 150, filterable: false, sortable: false,
      valueGetter: ({row}) => row.link, renderCell: ({row}) => getCanvasLink(row.link)
    },
    {
      field: 'credits', headerName: t(columnPrefix + 'credits'), width: 100
    },
    {
      field: 'speciality', headerName: t(columnPrefix + 'speciality'), width: 100,
      valueGetter: ({row}) => t('global.' + (row.speciality ? 'yes' : 'no'))
    },
    ...getEditDeleteColumn({allowed, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};


export const getTeachersColumns = ({user, setOpenUpdate, setOpenDelete, setSelectedRow}: BaseProps): GridColDef[] => {
  const allowed = userHasAdminRights(user.role);
  const columnPrefix = 'admin.teachers.fields.';

  return [
    {
      field: 'campus', headerName: t(columnPrefix + 'campus'), width: 200,
      valueGetter: ({row}) => row.ClassroomHasCourse.Classroom.Campus.name
    },
    {
      field: 'classroom', headerName: t(columnPrefix + 'classroom'), width: 250,
      valueGetter: ({row}) => `${row.ClassroomHasCourse.Classroom.name} ${row.ClassroomHasCourse.Classroom.promotion}`
    },
    {
      field: 'course', headerName: t(columnPrefix + 'course'), width: 150,
      valueGetter: ({row}) => row.ClassroomHasCourse.Course.name
    },
    {
      field: 'name', headerName: t(columnPrefix + 'name'), width: 250,
      valueGetter: ({row}) => `${row.User.firstName} ${row.User.lastName}`
    },
    {
      field: 'active', headerName: t(columnPrefix + 'active'), width: 100,
      valueGetter: ({row}) => t('global.' + (row.active ? 'yes' : 'no'))
    },
    ...getEditDeleteColumn({allowed, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};
