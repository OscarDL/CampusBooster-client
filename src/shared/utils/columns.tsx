import dayjs from 'dayjs';
import { t } from 'i18next';
import { IconButton } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';

import { User } from '../types/user';
import { Balance } from '../types/accounting';
import { isAccountingAdmin } from '../../components/app/categories/accounting/Accounting';


type AccountingProps = {
  user: User,
  setOpenUpdate: Dispatch<SetStateAction<boolean>>,
  setOpenDelete: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<Balance | null>>
};


export const getAccountingColumns = ({user, setOpenUpdate, setOpenDelete, setBalance}: AccountingProps): GridColDef[] => {
  const columnPrefix = 'accounting.data_grid.columns.';

  const userColumn = isAccountingAdmin(user.role) ? (
    [{ field: 'studentName', headerName: t(columnPrefix + 'student_name'), width: 200 }]
  ) : (
    []
  );

  const actionsColumn = isAccountingAdmin(user.role) ? (
    [{
      width: 100,
      field: 'actions',
      headerName: t(columnPrefix + 'actions'),

      renderCell: ({row}: GridRenderCellParams) => (
        <div>
          <IconButton
            color="primary"
            onClick={() => {
              setBalance(row);
              setOpenUpdate(true);
            }}
          >
            <Edit/>
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              setBalance(row);
              setOpenDelete(true);
            }}
          >
            <Delete/>
          </IconButton>
        </div>
      )
    }]
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
    { field: 'description', headerName: t(columnPrefix + 'description'), width: 300 },
    { field: 'debit', headerName: t(columnPrefix + 'debit'), width: 100 },
    { field: 'credit', headerName: t(columnPrefix + 'credit'), width: 100 },
    { field: 'status', headerName: t(columnPrefix + 'status'), width: 150, renderCell: ({row}) => t('accounting.status.' + row.status) },
    ...actionsColumn
  ];
};
