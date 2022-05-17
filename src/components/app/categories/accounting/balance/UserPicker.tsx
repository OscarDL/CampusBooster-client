import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

import { User } from '../../../../../shared/types/user';
import { useAppSelector } from '../../../../../store/store';
import { Balance, BalanceRequest } from '../../../../../shared/types/accounting';


type Props = {
  balance: Balance | BalanceRequest,
  setBalance: React.Dispatch<React.SetStateAction<any>>
};

type Option = {
  user: User,
  value: any,
  label: string
};


const BalanceUserPicker: FC<Props> = ({balance, setBalance}) => {
  const { t } = useTranslation();
  const { usersList } = useAppSelector(state => state.users);

  const [userOptions, setUserOptions] = useState<Option[]>([]);


  useEffect(() => {
    if (usersList) {
      const userOptions: Option[] = usersList.map(user => ({
        user: user,
        value: user.id,
        label: `${user.firstName} ${user.lastName}`
      }));

      setUserOptions(userOptions);
    }
  }, [usersList]);


  return (
    <Select
      isSearchable
      options={userOptions}
      isLoading={!usersList}
      isDisabled={!usersList}
      className="react-select-component"
      classNamePrefix="react-select-component"
      placeholder={t('accounting.select_user')}
      onChange={user => setBalance({...balance, userId: user?.value})}
      value={userOptions.find(option => option.user.id === balance.userId)}
      formatOptionLabel={option => `${option.label} (${option.user.email})`}
    />
  );
};


export default BalanceUserPicker;
