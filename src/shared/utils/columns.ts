import { t } from 'i18next';
import { GridColDef } from '@mui/x-data-grid-pro';

import { User } from '../types/user';
import { isAccountingAdmin } from '../../components/app/categories/accounting/Accounting';


export const getAccountingColumns = (user: User): GridColDef[] => {
  const columnPrefix = 'accounting.data_grid.columns.';

  const userColumn = isAccountingAdmin(user.role) ? (
    [{ field: 'studentName', headerName: t(columnPrefix + 'student_name'), width: 150 }]
  ) : (
    []
  );

  return [
    ...userColumn,
    { field: 'dateRequested', headerName: t(columnPrefix + 'date_requested'), width: 150 },
    { field: 'dateConfirmed', headerName: t(columnPrefix + 'date_confirmed'), width: 150 },
    { field: 'description', headerName: t(columnPrefix + 'description'), width: 300 },
    { field: 'debit', headerName: t(columnPrefix + 'debit'), width: 100 },
    { field: 'credit', headerName: t(columnPrefix + 'credit'), width: 100 },
    { field: 'status', headerName: t(columnPrefix + 'status'), width: 150 }
  ];
};
