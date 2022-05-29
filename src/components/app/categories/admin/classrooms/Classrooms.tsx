import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { FC, useEffect, useMemo, useState } from 'react';

import { Classroom } from '../../../../../shared/types/classroom';
import { getLoggedInAuthState } from '../../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../../shared/content';
import { getClassroomsColumns } from '../../../../../shared/utils/columns';
import { getMuiDataGridLocale } from '../../../../../shared/utils/locales';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { DataGridFooter, DataGridHeader, StyledDataGrid } from '../../../../shared/datagrid';
import { clearClassrooms, getClassrooms } from '../../../../../store/features/classrooms/slice';

import CreateCampus from './dialogs/Create';
import UpdateCampus from './dialogs/Update';
import DeleteCampus from './dialogs/Delete';
import Loader from '../../../../shared/loader';


const ClassroomsList: FC = () => {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { settings } = useAppSelector(state => state.app);
  const { classroomsList } = useAppSelector(state => state.classrooms);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);

  const columns = useMemo(() => (
    getClassroomsColumns({user, setOpenUpdate, setOpenDelete, setSelectedRow: setSelectedClassroom})
  ), [user]);


  useEffect(() => {
    if (!classroomsList) dispatch(getClassrooms());
  }, [classroomsList, dispatch]);


  return (
    <>
      <ContentHeader backButton title={t('admin.classrooms.title')}>
        <Button
          className="button"
          onClick={() => setOpenCreate(true)}
          startIcon={<span className="material-icons">add_circle_outline</span>}
        >
          {t('admin.classrooms.create.button')}
        </Button>
      </ContentHeader>

      <ContentBody>
        <StyledDataGrid
          apiRef={apiRef}
          checkboxSelection
          disableColumnPinning
          disableSelectionOnClick

          columns={columns}
          loading={!classroomsList}
          rows={classroomsList ?? []}
          pagination={settings.dataGrid.pagination}

          components={{
            LoadingOverlay: Loader,

            Toolbar: () => (
              <DataGridHeader
                loading={!classroomsList} refreshData={() => dispatch(clearClassrooms())}
                title={t('admin.classrooms.title', {count: apiRef.current.getVisibleRowModels().size})}
              />
            ),

            Footer: () => <DataGridFooter/>
          }}

          localeText={getMuiDataGridLocale(settings.lang)}
        />
      </ContentBody>

      <CreateCampus open={openCreate} setOpen={setOpenCreate}/>

      {selectedClassroom && <>
        <UpdateCampus classroom={selectedClassroom} open={openUpdate} setOpen={setOpenUpdate}/>
        <DeleteCampus classroom={selectedClassroom} open={openDelete} setOpen={setOpenDelete}/>
      </>}
    </>
  );
};


export default ClassroomsList;
