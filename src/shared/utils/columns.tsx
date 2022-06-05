import dayjs from 'dayjs';
import JSZip from 'jszip';
import { t } from 'i18next';
import { saveAs } from 'file-saver';
import { Dispatch, SetStateAction } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { DeleteOutlined, Download, EditOutlined, OpenInNewRounded, RemoveCircleOutlineOutlined, VisibilityOutlined } from '@mui/icons-material';

import { Course } from '../types/course';
import { Absence } from '../types/absence';
import { Contract } from '../types/contract';
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
    disableExport: true,
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
    [{
      field: 'student', headerName: t(columnPrefix + 'student'), width: 200,
      valueGetter: ({row}) => `${row.User.firstName} ${row.User.lastName}`
    }]
  ) : (
    []
  );


  return [
    ...userColumn,
    {
      field: 'dateRequested', headerName: t(columnPrefix + 'date_requested'), width: 150,
      valueGetter: ({row}) => dayjs(row.dateRequested).format(t('global.date.mm-dd-yyyy'))
    },
    {
      field: 'dateConfirmed', headerName: t(columnPrefix + 'date_confirmed'), width: 150,
      valueGetter: ({row}) => row.dateConfirmed ? dayjs(row.dateConfirmed).format(t('global.date.mm-dd-yyyy')) : null
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
      field: 'status', headerName: t(columnPrefix + 'status'), width: 150,
      valueGetter: ({row}) => t('accounting.status.' + row.status.toLowerCase())
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
      field: 'Campus', headerName: t(columnPrefix + 'campus'), width: 150, valueGetter: ({row}) => row.Campus?.name
    },
    {
      field: 'gender', headerName: t(columnPrefix + 'gender.title'), width: 100, hide: true,
      valueGetter: ({row}) => t(columnPrefix + `gender.${(row.gender ?? 'none').toLowerCase()}`)
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
      field: 'personalEmail', headerName: t(columnPrefix + 'personal_email'), width: 250, hide: true
    },
    {
      field: 'birthday', headerName: t(columnPrefix + 'birthday'), width: 150, hide: true,
      valueGetter: ({row}) => dayjs(row.birthday).format(t('global.date.mm-dd-yyyy'))
    },
    {
      field: 'address', headerName: t(columnPrefix + 'address'), width: 300, hide: true
    },
    {
      field: 'promotion', headerName: t(columnPrefix + 'promotion'), width: 100
    },
    {
      field: 'UserHasClassrooms', headerName: t(columnPrefix + 'classrooms'), width: 250,
      valueGetter: ({row}) => row.UserHasClassrooms.map((uhc: UserHasClassroom) => uhc.Classroom?.name).join(', ')
    },
    {
      field: 'credits', headerName: t(columnPrefix + 'credits'), width: 150, hide: true
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
      field: 'actions', headerName: t('data_grid.actions'), width: 100, filterable: false, sortable: false, disableExport: true,
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
      disableExport: true, valueGetter: ({row}) => row.link, renderCell: ({row}) => getCanvasLink(row.link)
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


export const getAbsencesColumns = ({user, setOpenUpdate, setOpenDelete, setSelectedRow}: BaseProps): GridColDef[] => {
  const columnPrefix = 'absences.fields.';
  const allowed = userHasAdminRights(user.role);

  const userColumn: GridColDef[] = userHasAdminRights(user.role) ? (
    [{
      field: 'student', headerName: t(columnPrefix + 'student'), width: 200,
      valueGetter: ({row}) => `${row.User.firstName} ${row.User.lastName}`
    }]
  ) : (
    []
  );

  const downloadFiles = (row: Absence) => {
    const zip = new JSZip();
    const keys = row.fileKeys;
    const files = row.fileBase64;

    for (let i = 0; i < files.length; i++) {
      const name = keys[i];
      const file = files[i].split('base64,')?.[1];
      zip.file(name.slice(name.lastIndexOf('/') + 1), file, {base64: true});
    };

    zip.generateAsync({type: 'blob'}).then((content) => {
      const course = row.Planning.ClassroomHasCourse?.Course;
      const student = `${row.User.firstName} ${row.User.lastName}`;
      const type = t(`${columnPrefix}type.${row.late ? 'late' : 'missing'}`);
      const date = dayjs(row.Planning.date).format(t('global.date.mm-dd-yyyy'));

      saveAs(content, `${student} - ${course?.name} (${type}) - ${date}.zip`);
    });
  };

  const downloadButton = (row: Absence) => (
    <Button
      sx={{ml: '-10px'}}
      startIcon={<Download/>}
      onClick={() => downloadFiles(row)}
    >
      {t(columnPrefix + 'files', {count: row.fileKeys.length})}
    </Button>
  );


  return [
    ...userColumn,
    {
      field: 'date', headerName: t(columnPrefix + 'date'), width: 150,
      valueGetter: ({row}) => dayjs(row.Planning.date).format(t('global.date.mmm-d-yyyy'))
    },
    {
      field: 'course', headerName: t(columnPrefix + 'course'), width: 100,
      valueGetter: ({row}) => row.Planning.ClassroomHasCourse.Course.name
    },
    {
      field: 'type', headerName: t(columnPrefix + 'type.title'), width: 100,
      valueGetter: ({row}) => t(`${columnPrefix}type.${row.late ? 'late' : 'missing'}`)
    },
    {
      field: 'period', headerName: t(columnPrefix + 'period.title'), width: 150,
      valueGetter: ({row}) => t(`${columnPrefix}period.${row.period.toLowerCase()}`)
    },
    {
      field: 'reason', headerName: t(columnPrefix + 'reason'), width: 300, valueGetter: ({row}) => row.reason,
      renderCell: ({row}) => (
        <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}} title={row.reason}>{row.reason}</div>
      )
    },
    {
      field: 'documents', headerName: t(columnPrefix + 'documents'), width: 150, filterable: false,
      sortable: false, disableExport: true, renderCell: ({row}) => downloadButton(row)
    },
    ...getEditDeleteColumn({allowed, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};


type ContractProps = BaseProps & {
  setOpenDetails: Dispatch<SetStateAction<boolean>>
};

export const getContractsColumns = ({user, setOpenUpdate, setOpenDelete, setOpenDetails, setSelectedRow}: ContractProps): GridColDef[] => {
  const columnPrefix = 'contracts.fields.';
  const allowed = userHasAdminRights(user.role);

  const userColumn: GridColDef[] = userHasAdminRights(user.role) ? (
    [{
      field: 'student', headerName: t(columnPrefix + 'student'), width: 200,
      valueGetter: ({row}) => `${row.User.firstName} ${row.User.lastName}`
    }]
  ) : (
    []
  );

  const openDetailsButton = (row: Contract) => (
    <Button
      sx={{ml: '-10px'}}
      endIcon={<VisibilityOutlined/>}
      onClick={() => {
        setSelectedRow(row);
        setOpenDetails(true);
      }}
    >
      {t(columnPrefix + 'details_field')}
    </Button>
  );


  return [
    ...userColumn,
    {
      field: 'startDate', headerName: t(columnPrefix + 'start_date'), width: 150,
      valueGetter: ({row}) => dayjs(row.startDate).format(t('global.date.mm-dd-yyyy'))
    },
    {
      field: 'endDate', headerName: t(columnPrefix + 'end_date'), width: 150,
      valueGetter: ({row}) => dayjs(row.endDate).format(t('global.date.mm-dd-yyyy'))
    },
    {
      field: 'company', headerName: t(columnPrefix + 'company'), width: 150
    },
    {
      field: 'url', headerName: t(columnPrefix + 'url'), width: 150, hide: true // Make link clickable
    },
    {
      field: 'supervisor', headerName: t(columnPrefix + 'supervisor'), width: 200,
      valueGetter: ({row}) => `${row.Supervisor.User.firstName} ${row.Supervisor.User.lastName}`
    },
    {
      field: 'mission', headerName: t(columnPrefix + 'mission'), width: 200, hide: true
    },
    {
      field: 'email', headerName: t(columnPrefix + 'email'), width: 200 // Make email clickable
    },
    {
      field: 'phone', headerName: t(columnPrefix + 'phone'), width: 150
    },
    {
      field: 'address', headerName: t(columnPrefix + 'address'), width: 300, hide: true
    },
    {
      field: 'details', headerName: t(columnPrefix + 'details'), width: 300, hide: true,
      renderCell: ({row}) => openDetailsButton(row)
    },
    ...getEditDeleteColumn({allowed, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};
