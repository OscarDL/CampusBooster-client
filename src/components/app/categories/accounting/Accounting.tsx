import { useTranslation } from 'react-i18next';
import { Button, styled } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';

import { dataGridTheme } from '../../../../shared/theme';
import { UserRoles } from '../../../../shared/types/user';
import { Balance } from '../../../../shared/types/accounting';
import { getLoggedInAuthState } from '../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { getAccountingColumns } from '../../../../shared/utils/columns';
import { getMuiDataGridLocale } from '../../../../shared/utils/locales';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { DataGridFooter, DataGridHeader } from '../../../shared/datagrid';
import { clearBalances, getBalances, getUserBalance } from '../../../../store/features/accounting/slice';

import Loader from '../../../shared/loader';
import CreateBalance from './balance/Create';
import UpdateBalance from './balance/Update';
import DeleteBalance from './balance/Delete';


const StyledDataGrid = styled(DataGridPro)(dataGridTheme);
export const isAccountingAdmin = (role: UserRoles) => (
  [UserRoles.Assistant, UserRoles.CampusManager, UserRoles.CampusBoosterAdmin].includes(role)
);


const Accounting: FC = () => {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { settings } = useAppSelector(state => state.app);
  const { balances } = useAppSelector(state => state.accounting);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [balance, setBalance] = useState<Balance | null>(null);

  const columns = useMemo(() => getAccountingColumns({
    user, setOpenUpdate, setOpenDelete, setBalance
  }), [user]);


  useEffect(() => {
    if (!balances) {
      isAccountingAdmin(user.role) ? dispatch(getBalances()) : dispatch(getUserBalance(user.id));
    }
  }, [balances, user, dispatch]);


  return (
    <>
      <ContentHeader title={t('accounting.title')}>
        {isAccountingAdmin(user.role) && (
          <Button
            className="button"
            onClick={() => setOpenCreate(true)}
            startIcon={<span className="material-icons">add_circle_outline</span>}
          >
            {t('accounting.add')}
          </Button>
        )}
      </ContentHeader>

      <ContentBody>
        <StyledDataGrid
          apiRef={apiRef}
          checkboxSelection
          disableColumnPinning
          disableSelectionOnClick

          loading={!balances}
          rows={balances ?? []} columns={columns}
          pagination={settings.dataGrid.pagination}

          components={{
            LoadingOverlay: Loader,

            Toolbar: () => (
              <DataGridHeader
                loading={!balances} refreshData={() => dispatch(clearBalances())}
                title={t('accounting.data_grid.title', {count: apiRef.current.getVisibleRowModels().size})}
              />
            ),

            Footer: () => <DataGridFooter/>
          }}

          localeText={getMuiDataGridLocale(settings.lang)}
        />
      </ContentBody>

      <CreateBalance open={openCreate} setOpen={setOpenCreate}/>

      {balance && <>
        <UpdateBalance balance={balance} open={openUpdate} setOpen={setOpenUpdate}/>
        <DeleteBalance balance={balance} open={openDelete} setOpen={setOpenDelete}/>
      </>}
    </>
  );
};


export default Accounting;
