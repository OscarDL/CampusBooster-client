import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { FC, useEffect, useMemo, useState } from 'react';

import { Grade } from '../../../../shared/types/grade';
import { getUsers } from '../../../../store/features/users/slice';
import { getGradesColumns } from '../../../../shared/utils/columns';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { getCourses } from '../../../../store/features/courses/slice';
import { getMuiDataGridLocale } from '../../../../shared/utils/locales';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { getLoggedInAuthState, userHasAdminRights } from '../../../../shared/functions';
import { DataGridFooter, DataGridHeader, StyledDataGrid } from '../../../shared/datagrid';
import { clearGrades, getGrades, getUserGrades } from '../../../../store/features/grades/slice';

import CreateBalance from './grade/Create';
import UpdateBalance from './grade/Update';
import DeleteBalance from './grade/Delete';
import Loader from '../../../shared/loader';


const Grades: FC = () => {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { settings } = useAppSelector(state => state.app);
  const { usersList } = useAppSelector(state => state.users);
  const { gradesList } = useAppSelector(state => state.grades);
  const { coursesList } = useAppSelector(state => state.courses);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);

  const isAdmin = useMemo(() => userHasAdminRights(user.role), [user.role]);
  const columns = useMemo(() => (
    getGradesColumns({user, setOpenUpdate, setOpenDelete, setSelectedRow: setSelectedGrade})
  ), [user]);


  useEffect(() => {
    const initData = async () => {
      if (!usersList) await dispatch(getUsers());
      if (!coursesList) await dispatch(getCourses());

      if (!gradesList) {
        await (isAdmin ? dispatch(getGrades()) : dispatch(getUserGrades(user.id)));
      }
    };

    // Do NOT include useEffect dependencies from initData() prior to gradesList
    // to avoid calling the API with getGrades() multiple times unnecessarily.
    initData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradesList, isAdmin, user.id, dispatch]);


  return (
    <>
      <ContentHeader title={t('grades.title')}>
        {isAdmin && (
          <Button
            className="button"
            onClick={() => setOpenCreate(true)}
            startIcon={<span className="material-icons">add_circle_outline</span>}
          >
            {t('grades.add')}
          </Button>
        )}
      </ContentHeader>

      <ContentBody>
        <StyledDataGrid
          apiRef={apiRef}
          checkboxSelection
          disableColumnPinning
          disableSelectionOnClick

          loading={!gradesList}
          rows={gradesList ?? []} columns={columns}
          pagination={settings.dataGrid.pagination}

          components={{
            LoadingOverlay: Loader,

            Toolbar: () => (
              <DataGridHeader
                loading={!gradesList} refreshData={() => dispatch(clearGrades())}
                title={t('grades.fields.title', {count: apiRef.current.getVisibleRowModels().size})}
              />
            ),

            Footer: () => <DataGridFooter/>
          }}

          localeText={getMuiDataGridLocale(settings.lang)}
        />
      </ContentBody>

      <CreateBalance open={openCreate} setOpen={setOpenCreate}/>

      {selectedGrade && <>
        <UpdateBalance grade={selectedGrade} open={openUpdate} setOpen={setOpenUpdate}/>
        <DeleteBalance grade={selectedGrade} open={openDelete} setOpen={setOpenDelete}/>
      </>}
    </>
  );
};


export default Grades;
