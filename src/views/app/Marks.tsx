import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Marks from '../../components/app/categories/marks/Marks';


const MarksView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('marks.title')}`;
  }, [t]);


  return (
    <div className="marks-view">
      <Marks/>
    </div>
  );
};


export default MarksView;
