import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { FC, useEffect, useMemo, useState } from 'react';

import { Course } from '../../../../shared/types/course';
import { getCoursesColumns } from '../../../../shared/utils/columns';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { getMuiDataGridLocale } from '../../../../shared/utils/locales';
import { setDataGridValue } from '../../../../store/features/app/slice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { clearCourses, getCourses } from '../../../../store/features/courses/slice';
import { getCurrentUserYear, getLoggedInAuthState } from '../../../../shared/functions';
import { DataGridFooter, DataGridHeader, StyledDataGrid } from '../../../shared/datagrid';

import YearTabs from './Tabs';
import CreateCourse from './course/Create';
import UpdateCourse from './course/Update';
import DeleteCourse from './course/Delete';
import Loader from '../../../shared/loader';
import { UserRoles } from '../../../../shared/types/user';


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
  const [tab, setTab] = useState(getCurrentUserYear(user));
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const columns = useMemo(() => (
    getCoursesColumns({user, setOpenUpdate, setOpenDelete, setSelectedRow: setSelectedCourse})
  ), [user]);


  useEffect(() => {
    if (!coursesList) dispatch(getCourses());
  }, [coursesList, dispatch]);

  useEffect(() => {
    apiRef.current.setColumnVisibility('year', tab === 0);
  }, [apiRef, tab]);


  return (
    <>
      <ContentHeader title={t('courses.title')}>
        {user.role === UserRoles.CampusBoosterAdmin && (
          <Button
            className="button"
            onClick={() => setOpenCreate(true)}
            startIcon={<span className="material-icons">add_circle_outline</span>}
          >
            {t('courses.create.button')}
          </Button>
        )}
      </ContentHeader>

      <YearTabs tab={tab} setTab={setTab}/>

      <ContentBody>
        <StyledDataGrid
          apiRef={apiRef}
          checkboxSelection
          disableColumnPinning
          disableSelectionOnClick

          columns={columns}
          loading={!coursesList}
          rows={(coursesList ?? [])
            .filter(course => tab > 0 ? course.year === tab : true)
            .sort((a, b) => a.name.localeCompare(b.name))
          }
          pageSize={settings.dataGrid.pageSize} pagination={settings.dataGrid.pagination}
          onPageSizeChange={value => dispatch(setDataGridValue({key: 'pageSize', value}))}

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
