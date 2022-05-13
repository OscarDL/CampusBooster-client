import { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { GridFooter } from '@mui/x-data-grid-pro';

import { setPagination } from '../../../store/features/app/slice';
import { useAppDispatch, useAppSelector } from '../../../store/store';


const DataGridFooter: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector(state => state.app);


  return (
    <div className="MuiDataGrid-customFooter">
      <GridFooter/>

      <div className="checkbox">
        <input
          id="pagination"
          type="checkbox"
          checked={settings.dataGrid.pagination}
          onChange={e => dispatch(setPagination(e.target.checked))}
        />
        <label htmlFor="pagination">{t('data_grid.pagination')}</label>
      </div>
    </div>
  );
};


export default DataGridFooter;
