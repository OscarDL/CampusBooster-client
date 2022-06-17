import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';
import ReactSelect, { SingleValue } from 'react-select';

import { useAppSelector } from '../../../../../../../../store/store';
import { ProjectRequest } from '../../../../../../../../shared/types/project';
import { Classroom, ClassroomHasCourse } from '../../../../../../../../shared/types/classroom';


type Props = {
  project: ProjectRequest,
  classroom: Classroom | undefined,
  setProject: React.Dispatch<React.SetStateAction<ProjectRequest>>
};

type Option = {
  classroomHasCourse: ClassroomHasCourse,
  label: string,
  value: number
};


const ProjectClassroomPicker: FC<Props> = ({classroom: selectedClassroom, project, setProject}) => {
  const { t } = useTranslation();
  const { classroomsList } = useAppSelector(state => state.classrooms);
  
  const [classroomHasCourseOptions, setClassroomHasCourseOptions] = useState<Option[]>([]);


  const handleChangeCourse = (option: SingleValue<Option>) => {
    setProject({...project, classroomHasCourseId: option?.value ?? 0});
  };


  useEffect(() => {
    if (classroomsList) {
      const classroomHasCourseOptions: Option[] = classroomsList
        .find(classroom => classroom.id === selectedClassroom?.id)?.ClassroomHasCourses?.slice()
        .sort((a, b) => a.Course!.name.localeCompare(b.Course!.name))
        .map(classroomHasCourse => ({
          classroomHasCourse,
          value: classroomHasCourse.id,
          label: classroomHasCourse.Course!.name
        })) ?? [];

      setClassroomHasCourseOptions(classroomHasCourseOptions);
    }
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
      value={classroomHasCourseOptions.find(option => option.value === project.classroomHasCourseId)}
    />
  );
};


export default ProjectClassroomPicker;
