import dayjs from 'dayjs';
import { t } from 'i18next';
import { IconButton } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';

import { User } from '../types/user';
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

  const userColumn = userHasAdminRights(user.role) ? (
    [{ field: 'studentName', headerName: t(columnPrefix + 'student_name'), width: 200 }]
  ) : (
    []
  );


  return [
    ...userColumn,
    {
      field: 'dateRequested', headerName: t(columnPrefix + 'date_requested'), width: 150,
      renderCell: ({row}) => dayjs(row.dateRequested).format(t('global.date-mm-dd-yyyy'))
    },
    {
      field: 'dateConfirmed', headerName: t(columnPrefix + 'date_confirmed'), width: 150,
      renderCell: ({row}) => row.dateConfirmed ? dayjs(row.dateConfirmed).format(t('global.date-mm-dd-yyyy')) : null
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
      field: 'status', headerName: t(columnPrefix + 'status'), width: 150, renderCell: ({row}) => t('accounting.status.' + row.status)
    },
    ...getEditDeleteColumn({user, columnPrefix, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};


export const getUsersColumns = ({user, setOpenUpdate, setOpenDelete, setSelectedRow}: BaseProps): GridColDef[] => {
  const columnPrefix = 'users.fields.';

  return [
    {
      field: 'role', headerName: t(columnPrefix + 'role'), width: 150, hideable: false,
      renderCell: ({row}) => t(`users.${row.role.toLowerCase()}.title_role`)
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
      renderCell: ({row}) => dayjs(row.birthday).format(t('global.date-mm-dd-yyyy'))
    },
    {
      field: 'Campus', headerName: t(columnPrefix + 'campus'), width: 125, renderCell: ({row}) => row.Campus?.name
    },
    {
      field: 'UserHasClassrooms', headerName: t(columnPrefix + 'classrooms'), width: 250,
      renderCell: ({row}) => row.UserHasClassrooms.map((uhc: UserHasClassroom) => uhc.Classroom.name).join(', ')
    },
    ...getEditDeleteColumn({user, columnPrefix, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};


export const getGradesColumns = ({user, setOpenUpdate, setOpenDelete, setSelectedRow}: BaseProps): GridColDef[] => {
  const columnPrefix = 'grades.fields.';

  const userColumn = userHasAdminRights(user.role) ? (
    [{ field: 'studentName', headerName: t(columnPrefix + 'student_name'), width: 200 }]
  ) : (
    []
  );


  return [
    ...userColumn,
    {
      field: 'classroom', headerName: t(columnPrefix + 'classroom'), width: 150,
      renderCell: ({row}) => row?.Course?.name ?? 'Temp course name'
    },
    {
      field: 'grade', headerName: t(columnPrefix + 'grade'), width: 150,
      renderCell: ({row}) => `${row.grade}/${row.max}`
    },
    {
      field: 'comment', headerName: t(columnPrefix + 'comment'), width: 300
    },
    {
      field: 'teacher', headerName: t(columnPrefix + 'teacher'), width: 200, hide: true,
      renderCell: ({row}) => `${row?.Teacher?.User?.firstName} ${row?.Teacher?.User?.lastName}`
    },
    ...getEditDeleteColumn({user, columnPrefix, setOpenUpdate, setOpenDelete, setSelectedRow})
  ];
};
