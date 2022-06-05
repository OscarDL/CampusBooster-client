import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { useAppSelector } from '../../../../../../store/store';
import { User, UserRoles } from '../../../../../../shared/types/user';
import { getLoggedInAuthState } from '../../../../../../shared/functions';
import { Absence, AbsenceRequest } from '../../../../../../shared/types/absence';


type Props = {
  absence: Absence | AbsenceRequest,
  setAbsence: React.Dispatch<React.SetStateAction<any>>
};

type Option = {
  user: User,
  value: any,
  label: string
};


const AbsenceUserPicker: FC<Props> = ({absence, setAbsence}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { usersList } = useAppSelector(state => state.users);

  const [userOptions, setUserOptions] = useState<Option[]>([]);
  const isStudent = useMemo(() => user.role === UserRoles.Student, [user.role]);

  const userOption: Option = useMemo(() => ({
    user,
    value: user.id,
    label: `${user.firstName} ${user.lastName} (${user.email})`
  }), [user]);


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
      className="react-select-component"
      isLoading={!isStudent && !usersList}
      isDisabled={isStudent || !usersList}
      classNamePrefix="react-select-component"
      placeholder={t('absences.select_student')}
      onChange={user => setAbsence({...absence, userId: user?.value})}
      value={isStudent ? userOption : userOptions.find(option => option.user.id === absence.userId)}
    />
  );
};


export default AbsenceUserPicker;
