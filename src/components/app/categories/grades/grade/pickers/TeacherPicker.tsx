import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

import { useAppSelector } from '../../../../../../store/store';
import { Teacher } from '../../../../../../shared/types/teacher';
import { Grade, GradeRequest } from '../../../../../../shared/types/grade';
import { getLoggedInAuthState, userHasAdminRights } from '../../../../../../shared/functions';


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
  const { user } = useAppSelector(getLoggedInAuthState);
  const { usersList } = useAppSelector(state => state.users);
  const { coursesList } = useAppSelector(state => state.courses);
  
  const [teacherOptions, setTeacherOptions] = useState<Option[]>([]);


  useEffect(() => {
    if (coursesList) {
      const selectedCourse = coursesList?.find(course => (
        course?.ClassroomHasCourses?.find(chc => chc.id === grade.classroomHasCourseId)
      ));

      const teacherOptions: Option[] = selectedCourse?.ClassroomHasCourses
        ?.find(chc => chc.id === grade.classroomHasCourseId)?.Teachers
        // For non-admins, only show the logged in user as a teacher
        ?.filter(teacher => userHasAdminRights(user.role) ? true : teacher.User.id === user.id)
        ?.map(teacher => ({
          teacher,
          value: teacher.id,
          label: `${teacher.User.firstName} ${teacher.User.lastName} (${teacher.User.email})`
        })) ?? [];

      setTeacherOptions(teacherOptions);
    }
  }, [coursesList, grade.classroomHasCourseId, user]);


  return !grade.teacherId ? (
    // We have to do it this way because for some reason, setting the value
    // to undefined doesn't refresh the value shown in the component's view
    <div>
      <ReactSelect
        isSearchable
        menuPosition="fixed"
        isLoading={!usersList}
        options={teacherOptions}
        className="react-select-component"
        classNamePrefix="react-select-component"
        placeholder={t('grades.fields.teacher')}
        noOptionsMessage={() => t('grades.no_teacher')}
        isDisabled={!usersList || !grade.classroomHasCourseId}
        onChange={option => setGrade({...grade, teacherId: option?.value ?? 0})}
      />
    </div>
  ) : (
    <ReactSelect
      isSearchable
      menuPosition="fixed"
      options={teacherOptions}
      className="react-select-component"
      classNamePrefix="react-select-component"
      isDisabled={!!grade.id} // disable for grade update
      onChange={option => setGrade({...grade, teacherId: option?.value ?? 0})}
      value={teacherOptions.find(option => option.teacher.id === grade.teacherId)}
    />
  );
};


export default GradeTeacherPicker;
