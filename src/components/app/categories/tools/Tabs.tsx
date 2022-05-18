import { FC } from 'react';
import { Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DispatchWithCallback } from '../../../../shared/hooks';

import Dropdown from '../../../shared/dropdown';
import { ToolCategory } from '../../../../shared/types/tools';


type TabsProps = {
  tab: number,
  setTab: DispatchWithCallback<React.SetStateAction<number>>
};


const ToolTabs: FC<TabsProps> = ({tab, setTab}) => {
  const { t } = useTranslation();

  const tabs = Object.values(ToolCategory).map(category => ({
    title: t(`tools.${category}.title`),
    icon: t(`tools.${category}.icon`)
  }));

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
          {tabs.map((tab, i) => (
            <div key={i} onClick={() => setTab(i)}>
              <span className="material-icons-outlined">{tab.icon}</span>
              {tab.title}
            </div>
          ))}
        </Dropdown>
      </div>

      <div className="tools-tabs">
        <Tabs // Material tabs for desktop
          value={tab}
          variant="scrollable"
          scrollButtons="auto"
          onChange={animateNewTab}
        >
          {tabs.map((tab, i) => (
            <Tab key={i} tabIndex={0} label={tab.title}/>
          ))}
        </Tabs>
      </div>
    </div>
  );
};


export default ToolTabs;
