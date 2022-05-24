import { User } from './user';
import { ClassroomHasCourse } from './classroom';


export type Grade = {
  id: number,
  average: number,
  comment: string,
  userId: User['id'],
  teacherId: User['id'],
  classroomHasCourseId: ClassroomHasCourse['id'],

  User: User,
  Teacher: User,
  ClassroomHasCourse: ClassroomHasCourse
};

export type GradeRequest = {
  id?: number,
  average: number,
  comment: string,
  userId: User['id'],
  teacherId: User['id'],
  classroomHasCourseId: ClassroomHasCourse['id']
};
