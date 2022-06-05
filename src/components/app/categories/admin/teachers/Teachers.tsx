import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { FC, useEffect, useMemo, useState } from 'react';

import { Teacher } from '../../../../../shared/types/teacher';
import { getUsers } from '../../../../../store/features/users/slice';
import { getLoggedInAuthState } from '../../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../../shared/content';
import { getCourses } from '../../../../../store/features/courses/slice';
import { getTeachersColumns } from '../../../../../shared/utils/columns';
import { getMuiDataGridLocale } from '../../../../../shared/utils/locales';
import { setDataGridValue } from '../../../../../store/features/app/slice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getClassrooms } from '../../../../../store/features/classrooms/slice';
import { clearTeachers, getTeachers } from '../../../../../store/features/teachers/slice';
import { DataGridFooter, DataGridHeader, StyledDataGrid } from '../../../../shared/datagrid';

import CreateTeacher from './dialogs/Create';
import UpdateTeacher from './dialogs/Update';
import DeleteTeacher from './dialogs/Delete';
import Loader from '../../../../shared/loader';


const TeachersList: FC = () => {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { settings } = useAppSelector(state => state.app);
  const { usersList } = useAppSelector(state => state.users);
  const { coursesList } = useAppSelector(state => state.courses);
  const { teachersList } = useAppSelector(state => state.teachers);
  const { classroomsList } = useAppSelector(state => state.classrooms);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const columns = useMemo(() => (
    getTeachersColumns({user, setOpenUpdate, setOpenDelete, setSelectedRow: setSelectedTeacher})
  ), [user]);


  useEffect(() => {
    const initData = async () => {
      if (!usersList) dispatch(getUsers());
      if (!coursesList) await dispatch(getCourses());
      if (!classroomsList) await dispatch(getClassrooms());

      if (!teachersList) dispatch(getTeachers());
    };

    // Do NOT include useEffect dependencies from initData() prior to teachers list
    // to avoid calling the API with other dispatch calls multiple times unnecessarily.
    initData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teachersList, dispatch]);


  return (
    <>
      <ContentHeader backButton title={t('admin.teachers.title')}>
        <Button
          className="button"
          onClick={() => setOpenCreate(true)}
          startIcon={<span className="material-icons">add_circle_outline</span>}
        >
          {t('admin.teachers.add.button')}
        </Button>
      </ContentHeader>

      <ContentBody>
        <StyledDataGrid
          apiRef={apiRef}
          checkboxSelection
          disableColumnPinning
          disableSelectionOnClick

          loading={!teachersList}
          columns={columns} rows={teachersList ?? []}
          pageSize={settings.dataGrid.pageSize} pagination={settings.dataGrid.pagination}
          onPageSizeChange={value => dispatch(setDataGridValue({key: 'pageSize', value}))}

          components={{
            LoadingOverlay: Loader,

            Toolbar: () => (
              <DataGridHeader
                loading={!teachersList} refreshData={() => dispatch(clearTeachers())}
                title={t('admin.teachers.title', {count: apiRef.current.getVisibleRowModels().size})}
              />
            ),

            Footer: () => <DataGridFooter/>
          }}

          localeText={getMuiDataGridLocale(settings.lang)}
        />
      </ContentBody>

      <CreateTeacher open={openCreate} setOpen={setOpenCreate}/>

      {selectedTeacher && <>
        <UpdateTeacher teacher={selectedTeacher} open={openUpdate} setOpen={setOpenUpdate}/>
        <DeleteTeacher teacher={selectedTeacher} open={openDelete} setOpen={setOpenDelete}/>
      </>}
    </>
  );
};


export default TeachersList;
