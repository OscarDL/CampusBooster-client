import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Button, Tab, Tabs } from '@mui/material';
import { TFunction, useTranslation } from 'react-i18next';

import { getLoggedInAuthState } from '../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { DispatchWithCallback, useStateWithCallback } from '../../../../shared/hooks';

import Dropdown from '../../../shared/dropdown';

import NetSecTab from './tabs/NetSec';
import GeneralTab from './tabs/General';
import DevelopmentTab from './tabs/Development';
import InfrastructureTab from './tabs/Infrastructure';

import './Tools.css';


type TabsProps = {
  tab: number,
  t: TFunction<'translation'>,
  setTab: DispatchWithCallback<React.SetStateAction<number>>
};

type TabDivProps = {
  tab: number,
  children: React.ReactNode
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

  const animateNewTab = (_: any, newTab: any) => {
    setTab(newTab, () => {
      const tabElement = document.getElementById('tools-tab-' + newTab);
      tabElement?.classList.add(`tab-slide-${tab > newTab ? 'left' : 'right'}`);
    });
  };

  return (
    <div className="container tools-tabs-container">
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
          onChange={animateNewTab}
        >
          {tabs.map((tab, i) => <Tab key={i} label={tab.title} style={{fontWeight: '500'}}/>)}
        </Tabs>
      </div>
    </div>
  );
};

const TabDiv: FC<TabDivProps> = ({children, tab}) => (
  <div className="tools-tab" id={`tools-tab-${tab}`}>
    {children}
  </div>
);


const Tools: FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector(getLoggedInAuthState);

  const [tab, setTab] = useStateWithCallback(0);


  return (
    <>
      <ContentHeader title={t('tools.title')}>
        {user.role === 'CAMPUS_BOOSTER_ADMIN' && (
          <Button
            className="button"
            onClick={() => null}
            startIcon={<span className="material-icons">add_circle_outline</span>}
          >
            {t('tools.add')}
          </Button>
        )}
      </ContentHeader>

      <ToolTabs t={t} tab={tab} setTab={setTab}/>

      <ContentBody>
        {tab === 0 && <TabDiv tab={tab}><GeneralTab/></TabDiv>}
        {tab === 1 && <TabDiv tab={tab}><DevelopmentTab/></TabDiv>}
        {tab === 2 && <TabDiv tab={tab}><InfrastructureTab/></TabDiv>}
        {tab === 3 && <TabDiv tab={tab}><NetSecTab/></TabDiv>}
      </ContentBody>
    </>
  );
};


export default Tools;
