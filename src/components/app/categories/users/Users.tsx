import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Button, Tab, Tabs } from '@mui/material';

import { UserRoles } from '../../../../shared/types/user';
import { getUsers } from '../../../../store/features/users/slice';
import { getLoggedInAuthState } from '../../../../shared/functions';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { DispatchWithCallback, useStateWithCallback } from '../../../../shared/hooks';

import UserTab from './Tab';
import CreateUser from './dialogs/Create';
import Loader from '../../../shared/loader';
import Dropdown from '../../../shared/dropdown';

import './Users.css';


type TabsProps = {
  tab: number,
  setTab: DispatchWithCallback<React.SetStateAction<number>>
};

type TabDivProps = {
  tab: number,
  children: React.ReactNode
};


const UserTabs: FC<TabsProps> = ({tab, setTab}) => {
  const { t } = useTranslation();

  const tabs = Object.values(UserRoles).map(role => ({
    title: t(`users.${role.toLowerCase()}.title__tab`),
    icon: t(`users.${role.toLowerCase()}.icon`)
  }));

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
          {tabs.map((tab, i) => <div key={i} onClick={() => setTab(i)}>{tab.title}</div>)}
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

const TabDiv: FC<TabDivProps> = ({children, tab}) => (
  <div className="users-tab" id={`users-tab-${tab}`}>
    {children}
  </div>
);


const Users: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { usersList } = useAppSelector(state => state.users);

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useStateWithCallback(0);


  useEffect(() => {
    if (!usersList) dispatch(getUsers());
  }, [usersList, dispatch]);


  return (
    <>
      <ContentHeader title={t('users.title')}>
        {user.role === UserRoles.CampusBoosterAdmin && (
          <Button
            className="button"
            onClick={() => setOpen(true)}
            startIcon={<span className="material-icons">add_circle_outline</span>}
          >
            {t('users.add')}
          </Button>
        )}
      </ContentHeader>

      <UserTabs tab={tab} setTab={setTab}/>

      <ContentBody>
        {usersList ? (
          Object.values(UserRoles).map((role, key) => (
            tab === key && (
              <TabDiv key={key} tab={tab}>
                <UserTab users={usersList.filter(user => user.role === role)}/>
              </TabDiv>
            )
          ))
        ) : (
          <Loader fullSize clickThrough/>
        )}
      </ContentBody>

      <CreateUser open={open} setOpen={setOpen}/>
    </>
  );
};


export default Users;
