import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Tools from '../../../components/app/categories/tools';

import './Tools.css';


const ToolsView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('tools.title')}`;
  }, [t]);


  return (
    <div className="tools-view">
      <Tools/>
    </div>
  );
};


export default ToolsView;
