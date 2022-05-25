import { Teacher, User } from './user';
import { ClassroomHasCourse } from './classroom';


export type Grade = {
  id: number,
  average: number,
  comment: string,
  userId: User['id'],
  teacherId: User['id'],
  classroomHasCourseId: ClassroomHasCourse['id'],

  User?: User,
  Teacher?: Teacher,
  ClassroomHasCourse?: ClassroomHasCourse
};

export type GradeRequest = {
  id?: number,
  average: number,
  comment: string,
  userId: User['id'],
  teacherId: Teacher['id'],
  classroomHasCourseId: ClassroomHasCourse['id']
};
