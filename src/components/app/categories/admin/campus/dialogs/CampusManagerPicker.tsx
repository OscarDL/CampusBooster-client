import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

import { useAppSelector } from '../../../../../../store/store';
import { User, UserRoles } from '../../../../../../shared/types/user';
import { Campus, CampusRequest } from '../../../../../../shared/types/campus';


type Props = {
  campus: Campus | CampusRequest,
  setCampus: React.Dispatch<React.SetStateAction<any>>
};

type Option = {
  user: User,
  label: string,
  value: number
};


const CampusManagerPicker: FC<Props> = ({campus, setCampus}) => {
  const { t } = useTranslation();
  const { usersList } = useAppSelector(state => state.users);

  const [userOptions, setUserOptions] = useState<Option[]>([]);


  useEffect(() => {
    if (usersList) {
      const userOptions: Option[] = usersList
        .filter(user => user.role === UserRoles.CampusManager)
        .map(user => ({
          user,
          value: user.id,
          label: `${user.firstName} ${user.lastName} (${user.email})`
        }));

      setUserOptions(userOptions);
    }
  }, [usersList]);


  return (
    <ReactSelect
      isSearchable
      options={userOptions}
      isLoading={!usersList}
      isDisabled={!usersList}
      className="react-select-component"
      classNamePrefix="react-select-component"
      placeholder={t('admin.campus.create.select_campus_manager')}
      value={userOptions.find(option => option.user.id === campus.campusManagerId)}
      onChange={option => setCampus({...campus, campusManagerId: option?.user?.id ?? 0})}
    />
  );
};


export default CampusManagerPicker;
