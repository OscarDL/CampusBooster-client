import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { FC, useEffect, useMemo, useState } from 'react';

import { Absence } from '../../../../shared/types/absence';
import { getUsers } from '../../../../store/features/users/slice';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { getAbsencesColumns } from '../../../../shared/utils/columns';
import { getMuiDataGridLocale } from '../../../../shared/utils/locales';
import { setDataGridValue } from '../../../../store/features/app/slice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { getLoggedInAuthState, userHasAdminRights } from '../../../../shared/functions';
import { DataGridFooter, DataGridHeader, StyledDataGrid } from '../../../shared/datagrid';
import { getPlannings, getUserPlanning } from '../../../../store/features/plannings/slice';
import { clearAbsences, getAbsences, getUserAbsences } from '../../../../store/features/absences/slice';

import Loader from '../../../shared/loader';
import CreateAbsence from './dialogs/Create';
import UpdateAbsence from './dialogs/Update';
import DeleteAbsence from './dialogs/Delete';


const Absences: FC = () => {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { settings } = useAppSelector(state => state.app);
  const { usersList } = useAppSelector(state => state.users);
  const { absencesList } = useAppSelector(state => state.absences);
  const { planningsList } = useAppSelector(state => state.plannings);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState<Absence | null>(null);

  const isAdmin = useMemo(() => userHasAdminRights(user.role), [user.role]);
  const columns = useMemo(() => (
    getAbsencesColumns({user, setOpenUpdate, setOpenDelete, setSelectedRow: setSelectedAbsence})
  ), [user]);


  useEffect(() => {
    const initData = async () => {
      if (!absencesList) {
        if (!isAdmin) {
          if (!planningsList) await dispatch(getUserPlanning(user.id));
          await dispatch(getUserAbsences(user.id));
          return;
        }

        if (!planningsList) await dispatch(getPlannings());
        if (!usersList) await dispatch(getUsers());
        await dispatch(getAbsences());
      }
    };

    // Do NOT include useEffect dependencies from initData() prior to absences list
    // to avoid calling the API with other dispatch calls multiple times unnecessarily.
    initData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [absencesList, isAdmin, user.id, user.role, dispatch]);


  return (
    <>
      <ContentHeader title={t('absences.title')}>
        <Button
          className="button"
          onClick={() => setOpenCreate(true)}
          startIcon={<span className="material-icons">add_circle_outline</span>}
        >
          {t('absences.add')}
        </Button>
      </ContentHeader>

      <ContentBody>
        <StyledDataGrid
          apiRef={apiRef}
          checkboxSelection
          disableColumnPinning
          disableSelectionOnClick

          loading={!absencesList}
          columns={columns} rows={absencesList ?? []}
          pageSize={settings.dataGrid.pageSize} pagination={settings.dataGrid.pagination}
          onPageSizeChange={value => dispatch(setDataGridValue({key: 'pageSize', value}))}

          components={{
            LoadingOverlay: Loader,

            Toolbar: () => (
              <DataGridHeader
                loading={!absencesList} refreshData={() => dispatch(clearAbsences())}
                title={t('absences.fields.title', {count: apiRef.current.getVisibleRowModels().size})}
              />
            ),

            Footer: () => <DataGridFooter/>
          }}

          localeText={getMuiDataGridLocale(settings.lang)}
        />
      </ContentBody>

      <CreateAbsence open={openCreate} setOpen={setOpenCreate}/>

      {selectedAbsence && <>
        <UpdateAbsence absence={selectedAbsence} open={openUpdate} setOpen={setOpenUpdate}/>
        <DeleteAbsence absence={selectedAbsence} open={openDelete} setOpen={setOpenDelete}/>
      </>}
    </>
  );
};


export default Absences;
