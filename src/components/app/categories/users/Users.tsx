import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useMemo, useState } from 'react';
import { GridColDef, useGridApiRef } from '@mui/x-data-grid-pro';

import { useStateWithCallback } from '../../../../shared/hooks';
import { User, UserRoles } from '../../../../shared/types/user';
import { getUsersColumns } from '../../../../shared/utils/columns';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { getMuiDataGridLocale } from '../../../../shared/utils/locales';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { clearUsersList, getUsers } from '../../../../store/features/users/slice';
import { getLoggedInAuthState, userHasAdminRights } from '../../../../shared/functions';
import { DataGridFooter, DataGridHeader, StyledDataGrid } from '../../../shared/datagrid';

import UserTabs from './Tabs';
import CreateUser from './dialogs/Create';
import UpdateUser from './dialogs/Update';
import DeleteUser from './dialogs/Delete';
import Loader from '../../../shared/loader';


const getUserTab = (user: User, tab: number) => {
  if (tab === 0) return true; // Show all users
  return user.role === Object.values(UserRoles).at(tab - 1);
};


const Users: FC = () => {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { settings } = useAppSelector(state => state.app);
  const { usersList } = useAppSelector(state => state.users);

  const [tab, setTab] = useStateWithCallback(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);


  const columns: GridColDef[] = useMemo(() => (
    getUsersColumns({user, setOpenUpdate, setOpenDelete, setSelectedRow: setSelectedUser})
  ), [user]);


  useEffect(() => {
    if (!usersList) dispatch(getUsers());
  }, [usersList, dispatch]);

  useEffect(() => {
    apiRef.current.setColumnVisibility('role', tab === 0);
  }, [apiRef, tab]);


  return (
    <>
      <ContentHeader title={t('users.title')}>
        {userHasAdminRights(user.role) && (
          <Button
            className="button"
            onClick={() => setOpenCreate(true)}
            startIcon={<span className="material-icons">add_circle_outline</span>}
          >
            {t('users.add')}
          </Button>
        )}
      </ContentHeader>

      <UserTabs tab={tab} setTab={setTab}/>

      <ContentBody>
        <StyledDataGrid
          apiRef={apiRef}
          checkboxSelection
          disableColumnPinning
          disableSelectionOnClick

          columns={columns}
          loading={!usersList}
          pagination={settings.dataGrid.pagination}
          rows={(usersList ?? []).filter(user => getUserTab(user, tab))}

          components={{
            LoadingOverlay: Loader,

            Toolbar: () => (
              <DataGridHeader
                loading={!usersList} refreshData={() => dispatch(clearUsersList())}
                title={t('users.fields.title', {count: apiRef.current.getVisibleRowModels().size})}
              />
            ),

            Footer: () => <DataGridFooter/>
          }}

          localeText={getMuiDataGridLocale(settings.lang)}
        />
      </ContentBody>

      <CreateUser open={openCreate} setOpen={setOpenCreate}/>

      {selectedUser && <>
        <UpdateUser user={selectedUser} open={openUpdate} setOpen={setOpenUpdate}/>
        <DeleteUser user={selectedUser} open={openDelete} setOpen={setOpenDelete}/>
      </>}
    </>
  );
};


export default Users;
