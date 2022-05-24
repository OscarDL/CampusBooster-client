import ReactSelect, { SingleValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { Course } from '../../../../../shared/types/course';
import { useAppSelector } from '../../../../../store/store';
import { Grade, GradeRequest } from '../../../../../shared/types/grade';


type Props = {
  grade: Grade | GradeRequest,
  setGrade: React.Dispatch<React.SetStateAction<any>>
};

type Option = {
  course: Course,
  value: any,
  label: string
};


const GradeCoursePicker: FC<Props> = ({grade, setGrade}) => {
  const { t } = useTranslation();
  const { usersList } = useAppSelector(state => state.users);
  const { coursesList } = useAppSelector(state => state.courses);
  
  const [courseOptions, setCourseOptions] = useState<Option[]>([]);

  const userChc = useMemo(() => {
    if (!(usersList && grade.userId)) return [];

    const user = usersList.find(user => user.id === grade.userId);
    return user?.UserHasClassrooms?.map(uhc => uhc.Classroom.ClassroomHasCourses).flat() ?? [];
  }, [usersList, grade.userId]);


  const handleChangeCourse = (value: SingleValue<Option>) => {
    console.log(userChc, value?.course);
    // const classroomHasCourse = userChc.find(chc => chc);

    setGrade({
      ...grade,
      // teacherId: classroomHasCourse?.teacherId ?? 0,
      // classroomHasCourseId: classroomHasCourse?.id ?? 0
    });
  };


  useEffect(() => {
    if (coursesList) {
      const courseOptions: Option[] = coursesList
        .filter(course => (
          course.ClassroomHasCourses.map(chc => chc.id).some(id => userChc?.map(chc => chc.id).includes(id))
        ))
        .map(course => ({
          course,
          value: course.id,
          label: `${course.name} (${course.description})`
        }));

      setCourseOptions(courseOptions);
    }
  }, [coursesList, userChc]);


  return (
    <ReactSelect
      isSearchable
      options={courseOptions}
      onChange={handleChangeCourse}
      className="react-select-component"
      placeholder={t('grades.select_course')}
      isLoading={!(coursesList && usersList)}
      classNamePrefix="react-select-component"
      isDisabled={!(coursesList && usersList) || !grade.userId}
      value={courseOptions.find(option => option.course.id === 2/*grade.classroomHasCourseId*/)}
    />
  );
};


export default GradeCoursePicker;
