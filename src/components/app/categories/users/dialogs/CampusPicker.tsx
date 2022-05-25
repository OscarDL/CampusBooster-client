import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

import { Campus } from '../../../../../shared/types/campus';
import { useAppSelector } from '../../../../../store/store';
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


const UserCampusPicker: FC<Props> = ({user, setUser}) => {
  const { t } = useTranslation();
  const { campusList } = useAppSelector(state => state.users);

  const [campusOptions, setCampusOptions] = useState<Option[]>([]);


  useEffect(() => {
    if (campusList) {
      const campusOptions: Option[] = campusList.map(campus => ({
        campus,
        value: campus.id,
        label: campus.name
      }));

      setCampusOptions(campusOptions);
    }
  }, [campusList]);


  return user.role === UserRoles.CampusBoosterAdmin ? (
    // We have to do it this way because for some reason, setting the value
    // to undefined doesn't refresh the value shown in the component's view
    <div>
      <ReactSelect isDisabled
        className="react-select-component"
        placeholder={t('users.select_campus')}
        classNamePrefix="react-select-component"
      />
    </div>
  ) : (
    <ReactSelect
      isSearchable
      options={campusOptions}
      isLoading={!campusList}
      isDisabled={!campusList}
      className="react-select-component"
      placeholder={t('users.select_campus')}
      classNamePrefix="react-select-component"
      onChange={campus => setUser({...user, campusId: campus?.value})}
      value={campusOptions.find(option => option.campus.id === user.campusId)}
    />
  );
};


export default UserCampusPicker;
