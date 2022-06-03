import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { FC, useEffect, useMemo, useState } from 'react';

import { UserRoles } from '../../../../shared/types/user';
import { Contract } from '../../../../shared/types/contract';
import { getUsers } from '../../../../store/features/users/slice';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { getContractsColumns } from '../../../../shared/utils/columns';
import { getMuiDataGridLocale } from '../../../../shared/utils/locales';
import { setDataGridValue } from '../../../../store/features/app/slice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { getLoggedInAuthState, userHasAdminRights } from '../../../../shared/functions';
import { DataGridFooter, DataGridHeader, StyledDataGrid } from '../../../shared/datagrid';
import { clearContracts, getContracts, getSupervisorContracts, getUserContracts } from '../../../../store/features/contracts/slice';

import CreateContract from './grade/Create';
import UpdateContract from './grade/Update';
import DeleteContract from './grade/Delete';
import Loader from '../../../shared/loader';


const Contracts: FC = () => {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { settings } = useAppSelector(state => state.app);
  const { usersList } = useAppSelector(state => state.users);
  const { contractsList } = useAppSelector(state => state.contracts);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const columns = useMemo(() => (
    getContractsColumns({user, setOpenUpdate, setOpenDelete, setSelectedRow: setSelectedContract})
  ), [user]);


  useEffect(() => {
    const initData = async () => {
      if (!usersList) await dispatch(getUsers());

      if (!contractsList) {
        switch (user.role) {
          case UserRoles.Student: {
            await dispatch(getUserContracts(user.id));
            break;
          }

          case UserRoles.Company: {
            await dispatch(getSupervisorContracts(user.id));
            break;
          }

          case UserRoles.Assistant:
          case UserRoles.CampusManager:
          case UserRoles.CampusBoosterAdmin: {
            await dispatch(getContracts());
          }
        };
      }
    };

    // Do NOT include useEffect dependencies from initData() prior to contractsList
    // to avoid calling the API with getContracts() multiple times unnecessarily.
    initData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractsList, user.id, user.role, dispatch]);


  return (
    <>
      <ContentHeader title={t('contracts.title')}>
        {userHasAdminRights(user.role) && (
          <Button
            className="button"
            onClick={() => setOpenCreate(true)}
            startIcon={<span className="material-icons">add_circle_outline</span>}
          >
            {t('contracts.add')}
          </Button>
        )}
      </ContentHeader>

      <ContentBody>
        <StyledDataGrid
          apiRef={apiRef}
          checkboxSelection
          disableColumnPinning
          disableSelectionOnClick

          loading={!contractsList}
          columns={columns} rows={contractsList ?? []}
          pageSize={settings.dataGrid.pageSize} pagination={settings.dataGrid.pagination}
          onPageSizeChange={value => dispatch(setDataGridValue({key: 'pageSize', value}))}

          components={{
            LoadingOverlay: Loader,

            Toolbar: () => (
              <DataGridHeader
                loading={!contractsList} refreshData={() => dispatch(clearContracts())}
                title={t('contracts.fields.title', {count: apiRef.current.getVisibleRowModels().size})}
              />
            ),

            Footer: () => <DataGridFooter/>
          }}

          localeText={getMuiDataGridLocale(settings.lang)}
        />
      </ContentBody>

      <CreateContract open={openCreate} setOpen={setOpenCreate}/>

      {selectedContract && <>
        <UpdateContract contract={selectedContract} open={openUpdate} setOpen={setOpenUpdate}/>
        <DeleteContract contract={selectedContract} open={openDelete} setOpen={setOpenDelete}/>
      </>}
    </>
  );
};


export default Contracts;
