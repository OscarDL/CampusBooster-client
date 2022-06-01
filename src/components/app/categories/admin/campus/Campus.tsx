import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { FC, useEffect, useMemo, useState } from 'react';

import { Campus } from '../../../../../shared/types/campus';
import { getCampusColumns } from '../../../../../shared/utils/columns';
import { getLoggedInAuthState } from '../../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../../shared/content';
import { getMuiDataGridLocale } from '../../../../../shared/utils/locales';
import { setDataGridValue } from '../../../../../store/features/app/slice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { clearCampus, getCampus } from '../../../../../store/features/campus/slice';
import { DataGridFooter, DataGridHeader, StyledDataGrid } from '../../../../shared/datagrid';

import CreateCampus from './dialogs/Create';
import UpdateCampus from './dialogs/Update';
import DeleteCampus from './dialogs/Delete';
import Loader from '../../../../shared/loader';


const CampusList: FC = () => {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { settings } = useAppSelector(state => state.app);
  const { campusList } = useAppSelector(state => state.campus);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);

  const columns = useMemo(() => (
    getCampusColumns({user, setOpenUpdate, setOpenDelete, setSelectedRow: setSelectedCampus})
  ), [user]);


  useEffect(() => {
    if (!campusList) dispatch(getCampus());
  }, [campusList, dispatch]);


  return (
    <>
      <ContentHeader backButton title={t('admin.campus.title')}>
        <Button
          className="button"
          onClick={() => setOpenCreate(true)}
          startIcon={<span className="material-icons">add_circle_outline</span>}
        >
          {t('admin.campus.create.button')}
        </Button>
      </ContentHeader>

      <ContentBody>
        <StyledDataGrid
          apiRef={apiRef}
          checkboxSelection
          disableColumnPinning
          disableSelectionOnClick

          loading={!campusList}
          columns={columns} rows={campusList ?? []}
          pageSize={settings.dataGrid.pageSize} pagination={settings.dataGrid.pagination}
          onPageSizeChange={value => dispatch(setDataGridValue({key: 'pageSize', value}))}

          components={{
            LoadingOverlay: Loader,

            Toolbar: () => (
              <DataGridHeader
                loading={!campusList} refreshData={() => dispatch(clearCampus())}
                title={t('admin.campus.title', {count: apiRef.current.getVisibleRowModels().size})}
              />
            ),

            Footer: () => <DataGridFooter/>
          }}

          localeText={getMuiDataGridLocale(settings.lang)}
        />
      </ContentBody>

      <CreateCampus open={openCreate} setOpen={setOpenCreate}/>

      {selectedCampus && <>
        <UpdateCampus campus={selectedCampus} open={openUpdate} setOpen={setOpenUpdate}/>
        <DeleteCampus campus={selectedCampus} open={openDelete} setOpen={setOpenDelete}/>
      </>}
    </>
  );
};


export default CampusList;
