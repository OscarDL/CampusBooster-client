import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { FC, useEffect, useMemo, useState } from 'react';

import { Balance } from '../../../../shared/types/accounting';
import { getUsers } from '../../../../store/features/users/slice';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { getAccountingColumns } from '../../../../shared/utils/columns';
import { getMuiDataGridLocale } from '../../../../shared/utils/locales';
import { setDataGridValue } from '../../../../store/features/app/slice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { getLoggedInAuthState, userHasAdminRights } from '../../../../shared/functions';
import { DataGridFooter, DataGridHeader, StyledDataGrid } from '../../../shared/datagrid';
import { clearBalances, getBalances, getUserBalance } from '../../../../store/features/accounting/slice';

import Loader from '../../../shared/loader';
import CreateBalance from './dialogs/Create';
import UpdateBalance from './dialogs/Update';
import DeleteBalance from './dialogs/Delete';


const Accounting: FC = () => {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { settings } = useAppSelector(state => state.app);
  const { usersList } = useAppSelector(state => state.users);
  const { balances } = useAppSelector(state => state.accounting);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedBalance, setSelectedBalance] = useState<Balance | null>(null);

  const isAdmin = useMemo(() => userHasAdminRights(user.role), [user.role]);
  const columns = useMemo(() => (
    getAccountingColumns({user, setOpenUpdate, setOpenDelete, setSelectedRow: setSelectedBalance})
  ), [user]);


  useEffect(() => {
    const initData = async () => {
      if (!balances) {
        if (!isAdmin) {
          await dispatch(getUserBalance(user.id));
          return;
        }

        if (!usersList) await dispatch(getUsers());
        await dispatch(getBalances());
      }
    };

    // Do NOT include useEffect dependencies from initData() prior to balances list
    // to avoid calling the API with other dispatch calls multiple times unnecessarily.
    initData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balances, isAdmin, user.id, dispatch]);


  return (
    <>
      <ContentHeader title={t('accounting.title')}>
        {isAdmin && (
          <Button
            className="button"
            onClick={() => setOpenCreate(true)}
            startIcon={<span className="material-icons">add_circle_outline</span>}
          >
            {t('accounting.create.button')}
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
          columns={columns} rows={balances ?? []}
          pageSize={settings.dataGrid.pageSize} pagination={settings.dataGrid.pagination}
          onPageSizeChange={value => dispatch(setDataGridValue({key: 'pageSize', value}))}

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

      {selectedBalance && <>
        <UpdateBalance balance={selectedBalance} open={openUpdate} setOpen={setOpenUpdate}/>
        <DeleteBalance balance={selectedBalance} open={openDelete} setOpen={setOpenDelete}/>
      </>}
    </>
  );
};


export default Accounting;
