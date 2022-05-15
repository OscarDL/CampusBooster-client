import { useTranslation } from 'react-i18next';
import { Button, styled } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { FC, useEffect, useMemo, useState } from 'react';

import { dataGridTheme } from '../../../../shared/theme';
import { UserRoles } from '../../../../shared/types/user';
import { getLoggedInAuthState } from '../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { getAccountingColumns } from '../../../../shared/utils/columns';
import { getMuiDataGridLocale } from '../../../../shared/utils/locales';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { DataGridFooter, DataGridHeader } from '../../../shared/datagrid';
import { clearBalances, getBalances, getUserBalance } from '../../../../store/features/accounting/slice';

import Loader from '../../../shared/loader';
import CreateBalance from './balance/Create';


const StyledDataGrid = styled(DataGridPro)(dataGridTheme);
export const isAccountingAdmin = (role: UserRoles) => [UserRoles.campusManager, UserRoles.campusBoosterAdmin].includes(role);


const Accounting: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { settings } = useAppSelector(state => state.app);
  const { balances } = useAppSelector(state => state.accounting);

  const [openCreate, setOpenCreate] = useState(false);
  const columns = useMemo(() => getAccountingColumns(user), [user]);


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
          loading={!balances}
          checkboxSelection disableColumnPinning
          rows={balances ?? []} columns={columns}
          pagination={settings.dataGrid.pagination}

          components={{
            LoadingOverlay: Loader,

            Toolbar: () => (
              <DataGridHeader
                refreshData={() => dispatch(clearBalances())}
                loading={!balances} dataCount={balances?.length}
                title={t('accounting.data_grid.title', {count: balances?.length})}
              />
            ),

            Footer: () => <DataGridFooter/>
          }}

          localeText={getMuiDataGridLocale(settings.lang)}
        />
      </ContentBody>

      <CreateBalance open={openCreate} setOpen={setOpenCreate}/>
    </>
  );
};


export default Accounting;
