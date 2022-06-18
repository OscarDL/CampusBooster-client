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
    t('grades.tabs.all'),
    t('grades.tabs.year_1'),
    t('grades.tabs.year_2'),
    t('grades.tabs.year_3'),
    t('grades.tabs.year_4'),
    t('grades.tabs.year_5')
  ];

  return (
    <div className="container grades-tabs-container">
      <div className="grades-select">
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

      <div className="grades-tabs">
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
