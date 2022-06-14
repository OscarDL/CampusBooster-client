import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

import { Campus } from '../../../../../shared/types/campus';
import { useAppSelector } from '../../../../../store/store';
import { getLoggedInAuthState } from '../../../../../shared/functions';
import { User, UserRequest, UserRoles } from '../../../../../shared/types/user';


type Props = {
  user: User | UserRequest,
  setUser: React.Dispatch<React.SetStateAction<any>>
};

type Option = {
  campus: Campus,
  label: string,
  value: number
};


const UserCampusPicker: FC<Props> = ({user: selectedUser, setUser}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { campusList } = useAppSelector(state => state.campus);

  const [campusOptions, setCampusOptions] = useState<Option[]>([]);


  useEffect(() => {
    if (campusList) {
      const campusOptions: Option[] = campusList
        // Only let Campus Booster admins select other campuses
        .filter(campus => user.campusId ? user.campusId === campus.id : true)
        // Only show campuses that do not have a campus manager if selected user role is campus manager
        .filter(campus => {
          if (selectedUser.role === UserRoles.CampusManager) {
            return !campus.CampusManager || campus.CampusManager.id === selectedUser.id;
          }
          return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(campus => ({
          campus,
          value: campus.id,
          label: campus.name
        }));

      setCampusOptions(campusOptions);
    }
  }, [campusList, user, selectedUser]);


  return selectedUser.role === UserRoles.CampusBoosterAdmin ? (
    // We have to do it this way because for some reason, setting the value
    // to undefined doesn't refresh the value shown in the component's view
    <div>
      <ReactSelect
        isDisabled
        isClearable
        menuPosition="fixed"
        className="react-select-component"
        placeholder={t('users.select_campus')}
        classNamePrefix="react-select-component"
      />
    </div>
  ) : (
    <ReactSelect
      isClearable
      isSearchable
      menuPosition="fixed"
      options={campusOptions}
      isLoading={!campusList}
      isDisabled={!campusList}
      className="react-select-component"
      placeholder={t('users.select_campus')}
      classNamePrefix="react-select-component"
      onChange={campus => setUser({...selectedUser, campusId: campus?.value})}
      value={campusOptions.find(option => option.campus.id === selectedUser.campusId)}
    />
  );
};


export default UserCampusPicker;
