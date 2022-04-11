import { FC, useState } from 'react';
import { Divider, Tab, Tabs } from '@mui/material';
import { TFunction } from 'react-i18next';
import { useTranslation } from 'react-i18next';

import { ContentBody, ContentHeader } from '../../../shared/content';

import CloudTab from './tabs/Cloud';
import GeneralTab from './tabs/General';
import SecurityTab from './tabs/Security';
import DevelopmentTab from './tabs/Development';
import Dropdown from '../../../shared/dropdown';
import Container from '../../../shared/container';

import './Tools.css';


type TabsProps = {
  tab: number,
  t: TFunction<'translation'>,
  setTab: React.Dispatch<React.SetStateAction<number>>
};

const TabsSelect: FC<TabsProps> = ({t, tab, setTab}) => (
  <div className="tools-tabs">
    <Tabs
      value={tab}
      variant="scrollable"
      onChange={(_, newTab) => setTab(newTab)}
    >
      <Tab label={t('tools.general.tab')} />
      <Tab label={t('tools.cloud.tab')} />
      <Tab label={t('tools.development.tab')} />
      <Tab label={t('tools.security.tab')} />
    </Tabs>
  </div>
);

const TabsDropdown: FC<TabsProps> = ({t, tab, setTab}) => {
  const tabs = [{
    title: t('tools.general.tab'),
    icon: 'language'
  }, {
    title: t('tools.cloud.tab'),
    icon: 'cloud'
  }, {
    title: t('tools.development.tab'),
    icon: 'terminal'
  }, {
    title: t('tools.security.tab'),
    icon: 'security'
  }];

  return (
    <div className="tools-select">
      <Dropdown
        id="tools-select"
        icon={tabs[tab].icon}
        title={tabs[tab].title}
      >
        {tabs.map((t, i) => <div onClick={() => setTab(i)}>{t.title}</div>)}
      </Dropdown>
    </div>
  );
};


const Tools: FC = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);

  return (
    <>
      <ContentHeader title={t('tools.title')}/>

      <ContentBody>
        <Container className="tools-container">
          <TabsSelect t={t} tab={tab} setTab={setTab}/>
          <TabsDropdown t={t} tab={tab} setTab={setTab}/>
          <Divider/>

          {tab === 0 && (
            <div className="tools-tab">
              <GeneralTab/>
            </div>
          )}

          {tab === 1 && (
            <div className="tools-tab">
              <CloudTab/>
            </div>
          )}

          {tab === 2 && (
            <div className="tools-tab">
              <DevelopmentTab/>
            </div>
          )}

          {tab === 3 && (
            <div className="tools-tab">
              <SecurityTab/>
            </div>
          )}
        </Container>
      </ContentBody>
    </>
  );
};


export default Tools;
