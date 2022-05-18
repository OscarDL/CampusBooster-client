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
  value: any,
  label: string
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


  return (
    <ReactSelect
      isSearchable
      options={campusOptions}
      isLoading={!campusList}
      className="react-select-component"
      placeholder={t('users.select_campus')}
      classNamePrefix="react-select-component"
      onChange={campus => setUser({...user, campusId: campus?.value})}
      isDisabled={!campusList || user.role === UserRoles.CampusBoosterAdmin}
      value={campusOptions.find(option => option.campus.id === user.campusId)}
    />
  );
};


export default UserCampusPicker;
