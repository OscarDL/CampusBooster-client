import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

import { useAppSelector } from '../../../../../../store/store';
import { Classroom } from '../../../../../../shared/types/classroom';
import { getLoggedInAuthState } from '../../../../../../shared/functions';


type Props = {
  disabled?: boolean,
  classroom: Classroom | undefined,
  setClassroom?: React.Dispatch<React.SetStateAction<Classroom | undefined>>
};

type Option = {
  classroom: Classroom,
  label: string,
  value: number
};


const PlanningClassroomPicker: FC<Props> = ({disabled, classroom, setClassroom}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { classroomsList } = useAppSelector(state => state.classrooms);
  
  const [classroomsOptions, setClassroomsOptions] = useState<Option[]>([]);


  useEffect(() => {
    if (classroomsList) {
      const classroomsOptions: Option[] = classroomsList
        .filter(classroom => user.campusId ? classroom.campusId === user.campusId : true)
        .map(classroom => ({
          classroom,
          value: classroom.id,
          label: `${classroom.name} ${user.campusId ? '' : `(${classroom.Campus?.name})`}`
        }));

      setClassroomsOptions(classroomsOptions);
    }
  }, [classroomsList, user.campusId]);


  return (
    <ReactSelect
      isSearchable
      menuPosition="fixed"
      isDisabled={disabled}
      options={classroomsOptions}
      className="react-select-component"
      classNamePrefix="react-select-component"
      onChange={option => setClassroom?.(option?.classroom)}
      placeholder={t('admin.teachers.add.select_classroom')}
      value={classroomsOptions.find(option => option.classroom.id === classroom?.id)}
    />
  );
};


export default PlanningClassroomPicker;
