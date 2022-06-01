import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Plannings from '../../../components/app/categories/admin/plannings';


const PlanningsView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('admin.plannings.title')}`;
  }, [t]);


  return (
    <div className="admin-plannings-view">
      <Plannings/>
    </div>
  );
};


export default PlanningsView;
