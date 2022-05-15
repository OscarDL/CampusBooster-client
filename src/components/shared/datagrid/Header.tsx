import { FC, ReactFragment } from 'react';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid-pro';


type Props = {
  loading: boolean,
  dataCount?: number,
  refreshData?: () => any,
  title: string | ReactFragment,
};


const DataGridHeader: FC<Props> = ({loading, dataCount = -1, refreshData, title}) => {
  const { t } = useTranslation();


  return (
    <div className="MuiDataGrid-customToolbar">
      <div className="MuiDataGrid-customToolbar__info">
        <span style={{color: 'rgb(var(--accent-color))'}}>
          {!loading ? title : t('global.loading') + '...'}
        </span>

        {refreshData && !loading && (
          <IconButton sx={{ml: 2}} onClick={refreshData}>
            <span className="material-icons">refresh</span>
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
