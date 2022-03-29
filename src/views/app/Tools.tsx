import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../components/shared/content';
import Tools from '../../components/app/categories/tools/Tools';


const ToolsView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('tools.title')}`;
  }, [t]);


  return (
    <div className="tools-view">
      <ContentHeader>
        <h2>{t('tools.title')}</h2>
      </ContentHeader>

      <Tools/>
    </div>
  );
};


export default ToolsView;
