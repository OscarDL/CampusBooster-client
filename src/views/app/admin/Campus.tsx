import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Campus from '../../../components/app/categories/admin/campus';


const CampusView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('admin.campus.title')}`;
  }, [t]);


  return (
    <div className="campus-view">
      <Campus/>
    </div>
  );
};


export default CampusView;
