import { ClassroomHasCourse } from './classroom';


export type Project = {
  id: number,
  startDate: string,
  endDate: string,
  title: string,
  details?: string,
  link: string,
  classroomHasCourseId: number,

  ClassroomHasCourse: ClassroomHasCourse
};

export type ProjectRequest = {
  id?: number,
  startDate: string,
  endDate: string,
  title: string,
  details?: string,
  link: string,
  classroomHasCourseId: number,
};
