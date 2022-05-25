import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

import { Teacher } from '../../../../../../shared/types/user';
import { useAppSelector } from '../../../../../../store/store';
import { Grade, GradeRequest } from '../../../../../../shared/types/grade';


type Props = {
  grade: Grade | GradeRequest,
  setGrade: React.Dispatch<React.SetStateAction<any>>
};

type Option = {
  teacher: Teacher,
  label: string,
  value: number
};


const GradeTeacherPicker: FC<Props> = ({grade, setGrade}) => {
  const { t } = useTranslation();
  const { usersList } = useAppSelector(state => state.users);
  const { coursesList } = useAppSelector(state => state.courses);
  
  const [teacherOptions, setTeacherOptions] = useState<Option[]>([]);


  useEffect(() => {
    if (usersList) {
      const selectedCourse = coursesList?.find(course => (
        course?.ClassroomHasCourses?.find(chc => chc.id === grade.classroomHasCourseId)
      ));

      const teacherOptions: Option[] = selectedCourse?.ClassroomHasCourses
        ?.find(chc => chc.id === grade.classroomHasCourseId)?.Teachers?.map(teacher => teacher)
        ?.map(teacher => ({
          teacher,
          value: teacher.id,
          label: `${teacher.User?.firstName} ${teacher.User?.lastName}`
        })) ?? [];

      setTeacherOptions(teacherOptions);
    }
  }, [coursesList, usersList, grade.classroomHasCourseId]);


  return !grade.teacherId ? (
    // We have to do it this way because for some reason, setting the value
    // to undefined doesn't refresh the value shown in the component's view
    <div>
      <ReactSelect
        isSearchable
        isLoading={!usersList}
        options={teacherOptions}
        className="react-select-component"
        classNamePrefix="react-select-component"
        placeholder={t('grades.fields.teacher')}
        isDisabled={!usersList || !grade.classroomHasCourseId}
        onChange={option => setGrade({...grade, teacherId: option?.value ?? 0})}
        value={teacherOptions.find(option => option.teacher.id === grade.teacherId)}
      />
    </div>
  ) : (
    <ReactSelect
      isSearchable
      options={teacherOptions}
      className="react-select-component"
      classNamePrefix="react-select-component"
      onChange={option => setGrade({...grade, teacherId: option?.value ?? 0})}
      value={teacherOptions.find(option => option.teacher.id === grade.teacherId)}
      formatOptionLabel={option => `${option.label} (${option.teacher.User?.email})`}
    />
  );
};


export default GradeTeacherPicker;