import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { FC, useEffect, useMemo, useState } from 'react';

import { Classroom } from '../../../../../shared/types/classroom';
import { getCampus } from '../../../../../store/features/campus/slice';
import { getLoggedInAuthState } from '../../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../../shared/content';
import { getCourses } from '../../../../../store/features/courses/slice';
import { setDataGridValue } from '../../../../../store/features/app/slice';
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
  const { campusList } = useAppSelector(state => state.campus);
  const { coursesList } = useAppSelector(state => state.courses);
  const { classroomsList } = useAppSelector(state => state.classrooms);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);

  const columns = useMemo(() => (
    getClassroomsColumns({user, setOpenUpdate, setOpenDelete, setSelectedRow: setSelectedClassroom})
  ), [user]);


  useEffect(() => {
    const initData = async () => {
      if (!campusList) await dispatch(getCampus());
      if (!coursesList) await dispatch(getCourses());

      if (!classroomsList) await dispatch(getClassrooms());
    };

    // Do NOT include useEffect dependencies from initData() prior to gradesList
    // to avoid calling the API with getGrades() multiple times unnecessarily.
    initData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

          loading={!classroomsList}
          columns={columns} rows={classroomsList ?? []}
          pageSize={settings.dataGrid.pageSize} pagination={settings.dataGrid.pagination}
          onPageSizeChange={value => dispatch(setDataGridValue({key: 'pageSize', value}))}

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
