import dayjs from 'dayjs';
import { t } from 'i18next';
import { IconButton } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { DeleteOutlined, EditOutlined, RemoveCircleOutlineOutlined } from '@mui/icons-material';

import { User, UserRoles } from '../types/user';
import { UserHasClassroom } from '../types/classroom';
import { userHasAdminRights } from '../../shared/functions';


type BaseProps = {
  user: User,
  setOpenUpdate: Dispatch<SetStateAction<boolean>>,
  setOpenDelete: Dispatch<SetStateAction<boolean>>,
  setSelectedRow: Dispatch<SetStateAction<any>>
};

type EditDeleteColumnProps = (props: BaseProps & {
  columnPrefix: string
}) => GridColDef[];


const getEditDeleteColumn: EditDeleteColumnProps = ({
  user, columnPrefix, setOpenUpdate, setOpenDelete, setSelectedRow
}) => {
  if (!userHasAdminRights(user.role)) return [];

  return [{
    width: 100,
    field: 'actions',
    headerName: t(columnPrefix + 'actions'),

    renderCell: ({row}: GridRenderCellParams) => (
      <div>
        <IconButton
          color="primary"
          onClick={() => {
            setSelectedRow(row);
            setOpenUpdate(true);
          }}
        >
          <EditOutlined/>
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            setSelectedRow(row);
            setOpenDelete(true);
          }}
        >
          <DeleteOutlined/>
        </IconButton>
      </div>
    )
  }]
};


export const getAccountingColumns = ({user, setOpenUpdate, setOpenDelete, setSelectedRow}: BaseProps): GridColDef[] => {
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
    ...getEditDeleteColumn({user, columnPrefix, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};


export const getUsersColumns = ({user, setOpenUpdate, setOpenDelete, setSelectedRow}: BaseProps): GridColDef[] => {
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
    ...getEditDeleteColumn({user, columnPrefix, setOpenUpdate, setOpenDelete, setSelectedRow})
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
  const columnPrefix = 'grades.fields.';

  const userColumn: GridColDef[] = user.role !== UserRoles.Student ? (
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
    ...getEditDeleteColumn({user, columnPrefix, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};
