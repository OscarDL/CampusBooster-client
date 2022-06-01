import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { FC, useEffect, useMemo, useState } from 'react';

import { Course } from '../../../../shared/types/course';
import { getCoursesColumns } from '../../../../shared/utils/columns';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { getMuiDataGridLocale } from '../../../../shared/utils/locales';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { clearCourses, getCourses } from '../../../../store/features/courses/slice';
import { getLoggedInAuthState, userHasAdminRights } from '../../../../shared/functions';
import { DataGridFooter, DataGridHeader, StyledDataGrid } from '../../../shared/datagrid';

import CreateCourse from './course/Create';
import UpdateCourse from './course/Update';
import DeleteCourse from './course/Delete';
import Loader from '../../../shared/loader';


const Courses: FC = () => {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { settings } = useAppSelector(state => state.app);
  const { coursesList } = useAppSelector(state => state.courses);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const isAdmin = useMemo(() => userHasAdminRights(user.role), [user.role]);
  const columns = useMemo(() => (
    getCoursesColumns({user, setOpenUpdate, setOpenDelete, setSelectedRow: setSelectedCourse})
  ), [user]);


  useEffect(() => {
    if (!coursesList) dispatch(getCourses());
  }, [coursesList, dispatch]);


  return (
    <>
      <ContentHeader title={t('courses.title')}>
        {isAdmin && (
          <Button
            className="button"
            onClick={() => setOpenCreate(true)}
            startIcon={<span className="material-icons">add_circle_outline</span>}
          >
            {t('courses.add')}
          </Button>
        )}
      </ContentHeader>

      <ContentBody>
        <StyledDataGrid
          apiRef={apiRef}
          checkboxSelection
          disableColumnPinning
          disableSelectionOnClick

          columns={columns}
          loading={!coursesList}
          pagination={settings.dataGrid.pagination}
          rows={(coursesList ?? []).slice().sort((a, b) => a.name.localeCompare(b.name))}

          components={{
            LoadingOverlay: Loader,

            Toolbar: () => (
              <DataGridHeader
                loading={!coursesList} refreshData={() => dispatch(clearCourses())}
                title={t('courses.fields.title', {count: apiRef.current.getVisibleRowModels().size})}
              />
            ),

            Footer: () => <DataGridFooter/>
          }}

          localeText={getMuiDataGridLocale(settings.lang)}
        />
      </ContentBody>

      <CreateCourse open={openCreate} setOpen={setOpenCreate}/>

      {selectedCourse && <>
        <UpdateCourse course={selectedCourse} open={openUpdate} setOpen={setOpenUpdate}/>
        <DeleteCourse course={selectedCourse} open={openDelete} setOpen={setOpenDelete}/>
      </>}
    </>
  );
};


export default Courses;
