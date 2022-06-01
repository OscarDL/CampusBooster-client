import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

import { useAppSelector } from '../../../../../../../store/store';
import { Classroom } from '../../../../../../../shared/types/classroom';
import { TeacherRequest } from '../../../../../../../shared/types/teacher';


type Props = {
  teacher: TeacherRequest,
  classroom: Classroom | undefined,
  setClassroom: React.Dispatch<React.SetStateAction<Classroom | undefined>>
};

type Option = {
  classroom: Classroom,
  label: string,
  value: number
};


const TeacherClassroomPicker: FC<Props> = ({teacher, classroom, setClassroom}) => {
  const { t } = useTranslation();
  const { usersList } = useAppSelector(state => state.users);
  const { classroomsList } = useAppSelector(state => state.classrooms);
  
  const [classroomsOptions, setClassroomsOptions] = useState<Option[]>([]);


  useEffect(() => {
    if (usersList) {
      // const selectedUser = usersList.find(user => user.id === teacher.userId);

      const classroomsOptions: Option[] = classroomsList
        // ?.filter(classroom => classroom.campusId === selectedUser?.campusId)
        ?.map(classroom => ({
          classroom,
          value: classroom.id,
          label: `${classroom.name} (${classroom.Campus?.name})`
        })) ?? [];

      setClassroomsOptions(classroomsOptions);
    }
  }, [classroomsList, usersList, teacher]);


  return !classroom ? (
    // We have to do it this way because for some reason, setting the value
    // to undefined doesn't refresh the value shown in the component's view
    <div>
      <ReactSelect
        isSearchable
        menuPosition="fixed"
        options={classroomsOptions}
        className="react-select-component"
        classNamePrefix="react-select-component"
        isLoading={!usersList || !classroomsList}
        isDisabled={!usersList || !teacher.userId}
        placeholder={t('admin.teachers.select_classroom')}
        onChange={option => setClassroom(option?.classroom)}
      />
    </div>
  ) : (
    <ReactSelect
      isSearchable
      menuPosition="fixed"
      options={classroomsOptions}
      className="react-select-component"
      classNamePrefix="react-select-component"
      onChange={option => setClassroom(option?.classroom)}
      value={classroomsOptions.find(option => option.classroom.id === classroom.id)}
    />
  );
};


export default TeacherClassroomPicker;
