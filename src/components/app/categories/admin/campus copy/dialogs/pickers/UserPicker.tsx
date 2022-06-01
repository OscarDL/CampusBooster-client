import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';
import ReactSelect, { SingleValue } from 'react-select';

import { useAppSelector } from '../../../../../../../store/store';
import { User, UserRoles } from '../../../../../../../shared/types/user';
import { TeacherRequest } from '../../../../../../../shared/types/teacher';


type Props = {
  teacher: TeacherRequest,
  setTeacher: React.Dispatch<React.SetStateAction<TeacherRequest>>
};

type Option = {
  user: User,
  value: any,
  label: string
};


const TeacherUserPicker: FC<Props> = ({teacher, setTeacher}) => {
  const { t } = useTranslation();
  const { usersList } = useAppSelector(state => state.users);
  
  const [userOptions, setUserOptions] = useState<Option[]>([]);


  const handleChangeUser = (option: SingleValue<Option>) => {
    setTeacher({
      ...teacher,
      classroomHasCourseId: 0,
      userId: option?.value ?? 0
    });
  };


  useEffect(() => {
    if (usersList) {
      const userOptions: Option[] = usersList
        .filter(user => [UserRoles.Student, UserRoles.Professor].includes(user.role))
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
      isDisabled={!usersList}
      onChange={handleChangeUser}
      className="react-select-component"
      classNamePrefix="react-select-component"
      placeholder={t('admin.teachers.select_user')}
      value={userOptions.find(option => option.user.id === teacher.userId)}
    />
  );
};


export default TeacherUserPicker;
