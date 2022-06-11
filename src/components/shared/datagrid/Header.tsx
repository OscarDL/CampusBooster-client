import { FC, ReactFragment } from 'react';
import { IconButton } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid-pro';


type Props = {
  loading: boolean,
  refreshData?: () => any,
  title: string | ReactFragment
};


const DataGridHeader: FC<Props> = ({loading, refreshData, title}) => {
  const { t } = useTranslation();


  return (
    <div className="MuiDataGrid-customToolbar">
      <div className="MuiDataGrid-customToolbar__info">
        <span style={{color: 'rgb(var(--accent-color))'}}>
          {!loading ? title : t('global.loading') + '...'}
        </span>

        {refreshData && !loading && (
          <IconButton color="primary" onClick={refreshData}>
            <Refresh/>
          </IconButton>
        )}
      </div>

      <GridToolbarContainer>
        <GridToolbarFilterButton/>
        <GridToolbarColumnsButton/>
        <GridToolbarExport/>
      </GridToolbarContainer>
    </div>
  );
};


export default DataGridHeader;
