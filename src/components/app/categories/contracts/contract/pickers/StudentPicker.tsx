import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

import { useAppSelector } from '../../../../../../store/store';
import { User, UserRoles } from '../../../../../../shared/types/user';
import { ContractRequest } from '../../../../../../shared/types/contract';


type Props = {
  contract: ContractRequest,
  setContract: React.Dispatch<React.SetStateAction<any>>
};

type Option = {
  user: User,
  value: any,
  label: string
};


const ContractSupervisorPicker: FC<Props> = ({contract, setContract}) => {
  const { t } = useTranslation();
  const { usersList } = useAppSelector(state => state.users);
  
  const [userOptions, setUserOptions] = useState<Option[]>([]);


  useEffect(() => {
    if (usersList) {
      const userOptions: Option[] = usersList
        .filter(user => user.role === UserRoles.Student)
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
      menuPosition="fixed"
      options={userOptions}
      isLoading={!usersList}
      className="react-select-component"
      classNamePrefix="react-select-component"
      placeholder={t('contracts.select_student')}
      isDisabled={!usersList || !!contract.id} // disable for contract update
      value={userOptions.find(option => option.user.id === contract.userId)}
      onChange={option => setContract({...contract, userId: option?.value ?? 0})}
    />
  );
};


export default ContractSupervisorPicker;
