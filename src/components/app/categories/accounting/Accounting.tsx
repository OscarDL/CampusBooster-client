import { FC } from 'react';
import { styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  DataGridPro, GridColDef, GridFooter, GridRowsProp,
  GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton
} from '@mui/x-data-grid-pro';

import { dataGridTheme } from '../../../../shared/theme';
import { useAppSelector } from '../../../../store/store';
import { ContentBody, ContentHeader } from '../../../shared/content';


const StyledDataGrid = styled(DataGridPro)(({theme}) => {console.log(theme); return dataGridTheme()});


const Accounting: FC = () => {
  const { t } = useTranslation();
  const { settings } = useAppSelector(state => state.app);


  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];


  return (
    <>
      <ContentHeader title={t('accounting.title')}/>

      <ContentBody>
        <StyledDataGrid
          pagination
          rows={rows}
          columns={columns}
          checkboxSelection
          disableColumnPinning

          components={{
            Toolbar: () => (
              <div className="MuiDataGrid-customToolbar">
                <div className="MuiDataGrid-customToolbar__info">
                  test
                </div>

                <GridToolbarContainer>
                  <GridToolbarFilterButton/>
                  <GridToolbarColumnsButton/>
                  <GridToolbarExport/>
                </GridToolbarContainer>
              </div>
            ),

            Footer: () => (
              <div className="MuiDataGrid-customFooter">
                <GridFooter/>
                <div className="checkbox">
                  <input
                    id="pagination"
                    type="checkbox"
                    onChange={e => console.log(e)}
                    checked={settings.dataGrid.pagination}
                  />
                  <label htmlFor="pagination">PAGINATION</label>
                </div>
              </div>
            )
          }}
        />
      </ContentBody>
    </>
  );
};


export default Accounting;
