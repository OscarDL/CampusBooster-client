import { useTranslation } from 'react-i18next';
import ReactSelect, { SingleValue } from 'react-select';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { Course } from '../../../../../../shared/types/course';
import { useAppSelector } from '../../../../../../store/store';
import { Grade, GradeRequest } from '../../../../../../shared/types/grade';
import { getLoggedInAuthState, userHasAdminRights } from '../../../../../../shared/functions';


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
  const { user } = useAppSelector(getLoggedInAuthState);
  const { usersList } = useAppSelector(state => state.users);
  const { gradesList } = useAppSelector(state => state.grades);
  const { coursesList } = useAppSelector(state => state.courses);
  
  const [coursesOptions, setCoursesOptions] = useState<Option[]>([]);

  const userChc = useMemo(() => {
    if (!(usersList && grade.userId)) return [];

    const user = usersList.find(user => user.id === grade.userId);
    return user?.UserHasClassrooms?.map(uhc => uhc.Classroom?.ClassroomHasCourses).flat() ?? [];
  }, [usersList, grade.userId]);


  const handleChangeCourse = (value: SingleValue<Option>) => {
    const classroomHasCourse = value?.course?.ClassroomHasCourses?.find(chc => (
      chc.id === userChc.find(uchc => uchc?.id === chc?.id)?.id
    ));

    setGrade({
      ...grade,
      teacherId: 0,
      classroomHasCourseId: classroomHasCourse?.id ?? 0
    });
  };


  useEffect(() => {
    if (coursesList) {
      const chcIds = (course: Course) => course.ClassroomHasCourses?.map(chc => chc.id);
      const grades = gradesList?.map(grade => grade.ClassroomHasCourse?.Course?.id ?? 0) ?? [];

      const coursesOptions: Option[] = coursesList
        .filter(course => !grades.includes(course?.id ?? 0))
        .filter(course => chcIds(course)?.some(id => userChc?.map(chc => chc?.id).includes(id)))
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter(course => (
          // Filter a second time if the logged-in user is the teacher adding the grade
          userHasAdminRights(user.role) ? true : (
            course.ClassroomHasCourses?.map(chc => chc.Teachers?.map(t => t.userId)).flat().includes(user.id)
          )
        ))
        .map(course => ({
          course,
          value: course.id,
          label: `${course.name} (${course.description})`
        }));

      setCoursesOptions(coursesOptions);
    }
  }, [coursesList, gradesList, user, userChc]);


  return !grade.userId ? (
    // We have to do it this way because for some reason, setting the value
    // to undefined doesn't refresh the value shown in the component's view
    <div>
      <ReactSelect
        isDisabled
        isSearchable
        menuPosition="fixed"
        onChange={handleChangeCourse}
        className="react-select-component"
        placeholder={t('grades.select_course')}
        isLoading={!(coursesList && usersList)}
        classNamePrefix="react-select-component"
        noOptionsMessage={() => t('grades.no_courses')}
        value={coursesOptions.find(option => option.course.ClassroomHasCourses?.find(chc => chc.id === grade.classroomHasCourseId))}
      />
    </div>
  ) : (
    <ReactSelect
      isSearchable
      menuPosition="fixed"
      options={coursesOptions}
      onChange={handleChangeCourse}
      className="react-select-component"
      placeholder={t('grades.select_course')}
      classNamePrefix="react-select-component"
      noOptionsMessage={() => t('grades.no_courses')}
      isDisabled={!!grade.id} // disable for grade update
      value={coursesOptions.find(option => option.course.ClassroomHasCourses?.find(chc => chc.id === grade.classroomHasCourseId))}
    />
  );
};


export default GradeCoursePicker;
