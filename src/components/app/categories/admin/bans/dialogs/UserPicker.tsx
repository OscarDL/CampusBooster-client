import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

import { User } from '../../../../../../shared/types/user';
import { useAppSelector } from '../../../../../../store/store';


type Props = {
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
};

type Option = {
  user: User,
  label: string,
  value: number
};


const UserClassroomPicker: FC<Props> = ({user, setUser}) => {
  const { t } = useTranslation();
  const { usersList } = useAppSelector(state => state.users);

  const [userOptions, setUserOptions] = useState<Option[]>([]);


  useEffect(() => {
    if (usersList) {
      const userOptions: Option[] = usersList
        .filter(user => !user.banned)
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
      onChange={option => setUser(option?.user ?? null)}
      placeholder={t('admin.banned_users.add.select_user')}
      value={userOptions.find(option => option.user.id === user?.id)}
    />
  );
};


export default UserClassroomPicker;
