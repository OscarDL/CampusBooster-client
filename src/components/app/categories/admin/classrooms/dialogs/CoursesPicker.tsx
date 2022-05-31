import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';
import ReactSelect, { components, GroupBase, MultiValueProps } from 'react-select';

import { Course } from '../../../../../../shared/types/course';
import { useAppSelector } from '../../../../../../store/store';
import { getLoggedInAuthState } from '../../../../../../shared/functions';
import { ClassroomRequest } from '../../../../../../shared/types/classroom';


type Props = {
  classroom: ClassroomRequest,
  setClassroom: React.Dispatch<React.SetStateAction<ClassroomRequest>>
};

type Option = {
  course: Course,
  label: string,
  value: number
};

const MultiValue = (props: MultiValueProps<Option, true, GroupBase<Option>>) => {
  return (
    <components.MultiValue {...props}>
      {props.data.course.name}
    </components.MultiValue>
  );
};


const CoursesPicker: FC<Props> = ({classroom, setClassroom}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { coursesList } = useAppSelector(state => state.courses);

  const [coursesOptions, setCoursesOptions] = useState<Option[]>([]);


  useEffect(() => {
    if (coursesList) {
      const coursesOptions: Option[] = coursesList
        .filter(course => course.id > 0)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(course => ({
          course,
          value: course.id,
          label: `${course.name} (${course.description})`
        }));

      setCoursesOptions(coursesOptions);
    }
  }, [coursesList, user]);


  return (
    <ReactSelect
      isMulti isSearchable
      menuPosition="fixed"
      options={coursesOptions}
      isLoading={!coursesList}
      isDisabled={!coursesList}
      components={{MultiValue}}
      closeMenuOnSelect={false}
      className="react-select-component"
      classNamePrefix="react-select-component"
      placeholder={t('admin.classrooms.select_courses')}
      noOptionsMessage={() => t('admin.classrooms.no_courses')}
      value={coursesOptions.filter(option => classroom.courses.includes(option.value))}
      onChange={courses => setClassroom({...classroom, courses: courses.map(c => c.value)})}
      filterOption={(option, search) => option.data.course.name.includes(search.toLowerCase())}
    />
  );
};


export default CoursesPicker;
