import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';
import ReactSelect, { SingleValue } from 'react-select';

import { useAppSelector } from '../../../../../../../store/store';
import { Classroom } from '../../../../../../../shared/types/classroom';
import { User, UserRoles } from '../../../../../../../shared/types/user';
import { TeacherRequest } from '../../../../../../../shared/types/teacher';


type Props = {
  teacher: TeacherRequest,
  setTeacher: React.Dispatch<React.SetStateAction<TeacherRequest>>,
  setClassroom: React.Dispatch<React.SetStateAction<Classroom | undefined>>
};

type Option = {
  user: User,
  value: any,
  label: string
};


const TeacherUserPicker: FC<Props> = ({teacher, setTeacher, setClassroom}) => {
  const { t } = useTranslation();
  const { usersList } = useAppSelector(state => state.users);
  
  const [userOptions, setUserOptions] = useState<Option[]>([]);


  const handleChangeUser = (option: SingleValue<Option>) => {
    setTeacher({
      ...teacher,
      classroomHasCourseId: 0,
      userId: option?.value ?? 0
    });
    setClassroom(undefined);
  };


  useEffect(() => {
    if (usersList) {
      const rolesAllowedAsTeacher = [UserRoles.Student, UserRoles.Professor, UserRoles.Company, UserRoles.Assistant, UserRoles.CampusManager];

      const userOptions: Option[] = usersList
        .filter(user => rolesAllowedAsTeacher.includes(user.role))
        .sort((a, b) => a.firstName.localeCompare(b.firstName))
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
      placeholder={t('admin.teachers.add.select_user')}
      value={userOptions.find(option => option.user.id === teacher.userId)}
    />
  );
};


export default TeacherUserPicker;
