import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';
import ReactSelect, { SingleValue } from 'react-select';

import { useAppSelector } from '../../../../../../store/store';
import { User, UserRoles } from '../../../../../../shared/types/user';
import { Grade, GradeRequest } from '../../../../../../shared/types/grade';


type Props = {
  grade: Grade | GradeRequest,
  setGrade: React.Dispatch<React.SetStateAction<any>>
};

type Option = {
  user: User,
  value: any,
  label: string
};


const GradeUserPicker: FC<Props> = ({grade, setGrade}) => {
  const { t } = useTranslation();
  const { usersList } = useAppSelector(state => state.users);
  
  const [userOptions, setUserOptions] = useState<Option[]>([]);


  const handleChangeUser = (option: SingleValue<Option>) => {
    setGrade({
      ...grade,
      teacherId: 0,
      classroomHasCourseId: 0,
      userId: option?.value ?? 0
    });
  };


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
      onChange={handleChangeUser}
      className="react-select-component"
      placeholder={t('grades.select_user')}
      classNamePrefix="react-select-component"
      noOptionsMessage={() => t('grades.no_students')}
      isDisabled={!usersList || !!grade.id} // disable for grade update
      value={userOptions.find(option => option.user.id === grade.userId)}
    />
  );
};


export default GradeUserPicker;
