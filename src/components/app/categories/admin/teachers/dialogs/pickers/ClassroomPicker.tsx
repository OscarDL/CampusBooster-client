import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';
import ReactSelect, { SingleValue } from 'react-select';

import { useAppSelector } from '../../../../../../../store/store';
import { Classroom } from '../../../../../../../shared/types/classroom';
import { TeacherRequest } from '../../../../../../../shared/types/teacher';


type Props = {
  teacher: TeacherRequest,
  classroom: Classroom | undefined,
  setTeacher: React.Dispatch<React.SetStateAction<TeacherRequest>>,
  setClassroom: React.Dispatch<React.SetStateAction<Classroom | undefined>>
};

type Option = {
  classroom: Classroom,
  label: string,
  value: number
};


const TeacherClassroomPicker: FC<Props> = ({teacher, setTeacher, classroom, setClassroom}) => {
  const { t } = useTranslation();
  const { usersList } = useAppSelector(state => state.users);
  const { classroomsList } = useAppSelector(state => state.classrooms);
  
  const [classroomsOptions, setClassroomsOptions] = useState<Option[]>([]);


  const handleChangeClassroom = (option: SingleValue<Option>) => {
    setClassroom(option?.classroom);
    setTeacher({...teacher, classroomHasCourseId: 0});
  };


  useEffect(() => {
    if (classroomsList) {
      const classroomsOptions: Option[] = classroomsList.slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(classroom => ({
          classroom,
          value: classroom.id,
          label: `${classroom.name} (${classroom.Campus?.name})`
        }));

      setClassroomsOptions(classroomsOptions);
    }
  }, [classroomsList, teacher]);


  return !classroom ? (
    // We have to do it this way because for some reason, setting the value
    // to undefined doesn't refresh the value shown in the component's view
    <div>
      <ReactSelect
        isSearchable
        menuPosition="fixed"
        options={classroomsOptions}
        onChange={handleChangeClassroom}
        className="react-select-component"
        classNamePrefix="react-select-component"
        isLoading={!usersList || !classroomsList}
        isDisabled={!usersList || !teacher.userId}
        placeholder={t('admin.teachers.add.select_classroom')}
      />
    </div>
  ) : (
    <ReactSelect
      isSearchable
      menuPosition="fixed"
      options={classroomsOptions}
      onChange={handleChangeClassroom}
      className="react-select-component"
      classNamePrefix="react-select-component"
      value={classroomsOptions.find(option => option.classroom.id === classroom.id)}
    />
  );
};


export default TeacherClassroomPicker;
