import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

import { User } from '../../../../../shared/types/user';
import { useAppSelector } from '../../../../../store/store';
import { Balance, BalanceRequest } from '../../../../../shared/types/accounting';


type Props = {
  balance: Balance | BalanceRequest,
  setBalance: React.Dispatch<React.SetStateAction<Balance | BalanceRequest>>
};

type Option = {
  user: User,
  value: any,
  label: string
};


const SelectBalanceUser: FC<Props> = ({balance, setBalance}) => {
  const { t } = useTranslation();
  const { users } = useAppSelector(state => state.accounting);

  const [userOptions, setUserOptions] = useState<Option[]>([]);


  useEffect(() => {
    if (users) {
      const userOptions: Option[] = users.map(user => ({
        user: user,
        value: user.id,
        label: `${user.firstName} ${user.lastName}`
      }));

      setUserOptions(userOptions);
    }
  }, [users]);


  return (
    <Select
      isSearchable
      isLoading={!users}
      isDisabled={!users}
      options={userOptions}
      className="react-select-component"
      classNamePrefix="react-select-component"
      placeholder={t('accounting.select_user')}
      onChange={user => setBalance({...balance, userId: user?.value})}
      formatOptionLabel={option => `${option.label} (${option.user.email})`}
    />
  );
};


export default SelectBalanceUser;
