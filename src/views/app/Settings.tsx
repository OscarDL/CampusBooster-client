import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../components/shared/content';
import Settings from '../../components/app/categories/settings/Settings';


const SettingsView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('settings.title')}`;
  }, [t]);


  return (
    <div className="settings-view">
      <ContentHeader>
        <h2>{t('settings.title')}</h2>
      </ContentHeader>

      <Settings/>
    </div>
  );
};


export default SettingsView;
