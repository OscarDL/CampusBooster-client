import { FC, useEffect } from 'react';
import { LinearProgress, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  DataGridPro, GridColDef, GridToolbarColumnsButton,
  GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton
} from '@mui/x-data-grid-pro';

import { dataGridTheme } from '../../../../shared/theme';
import DataGridFooter from '../../../shared/datagrid/Footer';
import { getLoggedInAuthState } from '../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { getMuiDataGridLocale } from '../../../../shared/utils/locales';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { getUserBalance } from '../../../../store/features/accounting/slice';


const StyledDataGrid = styled(DataGridPro)(dataGridTheme);


const Accounting: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { settings } = useAppSelector(state => state.app);
  const { balances } = useAppSelector(state => state.accounting);


  const columns: GridColDef[] = [
    { field: 'dateRequested', headerName: 'Date requested', width: 150 },
    { field: 'dateConfirmed', headerName: 'Date confirmed', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'debit', headerName: 'Debit', width: 100 },
    { field: 'credit', headerName: 'Credit', width: 100 },
    { field: 'status', headerName: 'Status', width: 150 }
  ];


  useEffect(() => {
    if (!balances) dispatch(getUserBalance(user.id));
  }, [balances, user.id, dispatch]);


  return (
    <>
      <ContentHeader title={t('accounting.title')}/>

      <ContentBody>
        <StyledDataGrid
          loading={!balances}
          checkboxSelection disableColumnPinning
          rows={balances ?? []} columns={columns}
          pagination={settings.dataGrid.pagination}

          components={{
            LoadingOverlay: LinearProgress,

            Toolbar: () => (
              <div className="MuiDataGrid-customToolbar">
                <div className="MuiDataGrid-customToolbar__info">
                  test
                </div>

                <GridToolbarContainer>
                  <GridToolbarFilterButton/>
                  <GridToolbarColumnsButton/>
                  <GridToolbarExport/>
                </GridToolbarContainer>
              </div>
            ),

            Footer: () => <DataGridFooter/>
          }}

          localeText={getMuiDataGridLocale(settings.lang)}
        />
      </ContentBody>
    </>
  );
};


export default Accounting;
