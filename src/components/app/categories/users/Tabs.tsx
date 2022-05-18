import { FC } from 'react';
import { Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { UserRoles } from '../../../../shared/types/user';
import { DispatchWithCallback } from '../../../../shared/hooks';

import Dropdown from '../../../shared/dropdown';


type TabsProps = {
  tab: number,
  setTab: DispatchWithCallback<React.SetStateAction<number>>
};


const UserTabs: FC<TabsProps> = ({tab, setTab}) => {
  const { t } = useTranslation();

  const tabAll = [{
    title: t('users.tab_all.title'),
    icon: t('users.tab_all.icon')
  }];
  const tabs = tabAll.concat(
    Object.values(UserRoles).map(role => ({
      title: t(`users.${role.toLowerCase()}.title_tab`),
      icon: t(`users.${role.toLowerCase()}.icon`)
    }))
  );

  const animateNewTab = (_: any, newTab: any) => {
    setTab(newTab, () => {
      const tabElement = document.getElementById('users-tab-' + newTab);
      tabElement?.classList.add(`tab-slide-${tab > newTab ? 'left' : 'right'}`);
    });
  };

  return (
    <div className="container users-tabs-container">
      <div className="users-select">
        <Dropdown // Dropdown tabs for mobile
          align="center"
          id="users-select"
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


export default UserTabs;
