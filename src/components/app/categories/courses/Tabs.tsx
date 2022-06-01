import { FC } from 'react';
import { Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Dropdown from '../../../shared/dropdown';


type TabsProps = {
  tab: number,
  setTab: React.Dispatch<React.SetStateAction<number>>
};


const YearTabs: FC<TabsProps> = ({tab, setTab}) => {
  const { t } = useTranslation();

  const tabs = [
    t('courses.tabs.all'),
    t('courses.tabs.year_1'),
    t('courses.tabs.year_2'),
    t('courses.tabs.year_3'),
    t('courses.tabs.year_4'),
    t('courses.tabs.year_5')
  ];

  return (
    <div className="container courses-tabs-container">
      <div className="courses-select">
        <Dropdown // Dropdown tabs for mobile
          icon="school"
          align="center"
          id="users-select"
          title={tabs[tab]}
        >
          {tabs.map((tab, i) => (
            <div key={i} onClick={() => setTab(i)}>{tab}</div>
          ))}
        </Dropdown>
      </div>

      <div className="courses-tabs">
        <Tabs // Material tabs for desktop
          value={tab}
          variant="scrollable"
          scrollButtons="auto"
          onChange={(_, tab) => setTab(tab)}
        >
          {tabs.map((tab, i) => (
            <Tab key={i} tabIndex={0} label={tab}/>
          ))}
        </Tabs>
      </div>
    </div>
  );
};


export default YearTabs;
