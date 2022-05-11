import { FC } from 'react';
import { styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import { dataGridTheme } from '../../../../shared/theme';
import { ContentBody, ContentHeader } from '../../../shared/content';


const StyledDataGrid = styled(DataGrid)(dataGridTheme);


const Accounting: FC = () => {
  const { t } = useTranslation();


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
          rows={rows}
          columns={columns}
        />
      </ContentBody>
    </>
  );
};


export default Accounting;
