import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';
import ReactSelect, { SingleValue } from 'react-select';

import { useAppSelector } from '../../../../../../../../store/store';
import { PlanningRequest } from '../../../../../../../../shared/types/planning';
import { Classroom, ClassroomHasCourse } from '../../../../../../../../shared/types/classroom';


type Props = {
  planningEntry: PlanningRequest,
  classroom: Classroom | undefined,
  setPlanningEntry: React.Dispatch<React.SetStateAction<PlanningRequest>>
};

type Option = {
  classroomHasCourse: ClassroomHasCourse,
  label: string,
  value: number
};


const PlanningClassroomPicker: FC<Props> = ({classroom: selectedClassroom, planningEntry, setPlanningEntry}) => {
  const { t } = useTranslation();
  const { classroomsList } = useAppSelector(state => state.classrooms);
  
  const [classroomHasCourseOptions, setClassroomHasCourseOptions] = useState<Option[]>([]);


  const handleChangeCourse = (option: SingleValue<Option>) => {
    setPlanningEntry({...planningEntry, classroomHasCourseId: option?.value ?? 0});
  };


  useEffect(() => {
    const classroomHasCourseOptions: Option[] = classroomsList
      ?.find(classroom => classroom.id === selectedClassroom?.id)?.ClassroomHasCourses
      ?.slice()?.sort((a, b) => a.Course!.name.localeCompare(b.Course!.name))
      ?.map(classroomHasCourse => ({
        classroomHasCourse,
        value: classroomHasCourse.id,
        label: classroomHasCourse.Course!.name
      })) ?? [];

    setClassroomHasCourseOptions(classroomHasCourseOptions);
  }, [classroomsList, selectedClassroom]);


  return !selectedClassroom ? (
    // We have to do it this way because for some reason, setting the value
    // to undefined doesn't refresh the value shown in the component's view
    <div>
      <ReactSelect
        isDisabled
        isSearchable
        menuPosition="fixed"
        onChange={handleChangeCourse}
        className="react-select-component"
        options={classroomHasCourseOptions}
        classNamePrefix="react-select-component"
        placeholder={t('admin.teachers.add.select_course')}
      />
    </div>
  ) : (
    <ReactSelect
      isSearchable
      menuPosition="fixed"
      onChange={handleChangeCourse}
      className="react-select-component"
      options={classroomHasCourseOptions}
      classNamePrefix="react-select-component"
      placeholder={t('admin.teachers.add.select_course')}
      value={classroomHasCourseOptions.find(option => option.value === planningEntry.classroomHasCourseId)}
    />
  );
};


export default PlanningClassroomPicker;
