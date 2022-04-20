import { FC, useState } from 'react';
import { TFunction } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { Divider, Tab, Tabs } from '@mui/material';

import { ContentBody, ContentHeader } from '../../../shared/content';

import Dropdown from '../../../shared/dropdown';

import NetSecTab from './tabs/NetSec';
import GeneralTab from './tabs/General';
import DevelopmentTab from './tabs/Development';
import InfrastructureTab from './tabs/Infrastructure';

import './Tools.css';


type TabsProps = {
  tab: number,
  t: TFunction<'translation'>,
  setTab: React.Dispatch<React.SetStateAction<number>>
};


const ToolTabs: FC<TabsProps> = ({t, tab, setTab}) => {
  const tabs = [{
    title: t('tools.general.tab'),
    icon: 'language'
  }, {
    title: t('tools.development.tab'),
    icon: 'terminal'
  }, {
    title: t('tools.infrastructure.tab'),
    icon: 'storage'
  }, {
    title: t('tools.net-sec.tab'),
    icon: 'security'
  }];

  return (
    <>
      <div className="tools-select">
        <Dropdown // Dropdown tabs for mobile
          align="center"
          id="tools-select"
          icon={tabs[tab].icon}
          title={tabs[tab].title}
        >
          {tabs.map((tab, i) => <div key={i} onClick={() => setTab(i)}>{tab.title}</div>)}
        </Dropdown>
      </div>

      <div className="tools-tabs">
        <Tabs // Material tabs for desktop
          value={tab}
          variant="scrollable"
          scrollButtons={false}
          onChange={(_, newTab) => setTab(newTab)}
        >
          {tabs.map((tab, i) => <Tab key={i} label={tab.title} style={{fontWeight: '500'}}/>)}
        </Tabs>
      </div>
    </>
  );
};


const Tools: FC = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);

  return (
    <>
      <ContentHeader title={t('tools.title')}/>

      <ToolTabs t={t} tab={tab} setTab={setTab}/>
      <Divider/>

      <ContentBody className="tools-tab">
        {tab === 0 && <GeneralTab/>}
        {tab === 1 && <DevelopmentTab/>}
        {tab === 2 && <InfrastructureTab/>}
        {tab === 3 && <NetSecTab/>}
      </ContentBody>
    </>
  );
};


export default Tools;
