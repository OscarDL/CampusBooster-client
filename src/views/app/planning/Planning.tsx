import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Planning from '../../../components/app/categories/planning';

import './Planning.css';


const PlanningView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('planning.title')}`;
  }, [t]);


  return (
    <div className="planning-view">
      <Planning/>
    </div>
  );
};


export default PlanningView;
