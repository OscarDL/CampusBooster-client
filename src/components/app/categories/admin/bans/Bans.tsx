import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { FC, useEffect, useMemo, useState } from 'react';

import { User } from '../../../../../shared/types/user';
import { getCampus } from '../../../../../store/features/campus/slice';
import { ContentBody, ContentHeader } from '../../../../shared/content';
import { getMuiDataGridLocale } from '../../../../../shared/utils/locales';
import { getBannedUsersColumns } from '../../../../../shared/utils/columns';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getClassrooms } from '../../../../../store/features/classrooms/slice';
import { clearUsers, getUsers } from '../../../../../store/features/users/slice';
import { DataGridFooter, DataGridHeader, StyledDataGrid } from '../../../../shared/datagrid';

import AddBan from './dialogs/Add';
import RemoveBan from './dialogs/Remove';
import Loader from '../../../../shared/loader';


const BannedUsers: FC = () => {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector(state => state.app);
  const { usersList } = useAppSelector(state => state.users);
  const { campusList } = useAppSelector(state => state.campus);
  const { classroomsList } = useAppSelector(state => state.classrooms);

  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const columns = useMemo(() => (
    getBannedUsersColumns({setOpenDelete: setOpenRemove, setSelectedRow: setSelectedUser})
  ), []);


  useEffect(() => {
    const initData = async () => {
      if (!campusList) await dispatch(getCampus());
      if (!classroomsList) await dispatch(getClassrooms());

      if (!usersList) await dispatch(getUsers());
    };

    // Do NOT include useEffect dependencies from initData() prior to gradesList
    // to avoid calling the API with getGrades() multiple times unnecessarily.
    initData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersList, dispatch]);


  return (
    <>
      <ContentHeader backButton title={t('admin.banned_users.title')}>
        <Button
          className="button"
          onClick={() => setOpenAdd(true)}
          startIcon={<span className="material-icons">add_circle_outline</span>}
        >
          {t('admin.banned_users.add.button')}
        </Button>
      </ContentHeader>

      <ContentBody>
        <StyledDataGrid
          apiRef={apiRef}
          checkboxSelection
          disableColumnPinning
          disableSelectionOnClick

          columns={columns}
          loading={!usersList}
          pagination={settings.dataGrid.pagination}
          rows={(usersList ?? []).filter(user => user.banned)}

          components={{
            LoadingOverlay: Loader,

            Toolbar: () => (
              <DataGridHeader
                loading={!usersList} refreshData={() => dispatch(clearUsers())}
                title={t('admin.banned_users.title', {count: apiRef.current.getVisibleRowModels().size})}
              />
            ),

            Footer: () => <DataGridFooter/>
          }}

          localeText={getMuiDataGridLocale(settings.lang)}
        />
      </ContentBody>

      <AddBan open={openAdd} setOpen={setOpenAdd}/>

      {selectedUser && <RemoveBan user={selectedUser} open={openRemove} setOpen={setOpenRemove}/>}
    </>
  );
};


export default BannedUsers;
