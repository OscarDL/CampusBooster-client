import { ClassroomHasCourse } from './classroom';
import { PublicUser, Teacher, User } from './user';


export type Grade = {
  id: number,
  average: number,
  comment: string,
  userId: User['id'],
  teacherId: User['id'],
  classroomHasCourseId: ClassroomHasCourse['id'],

  User?: PublicUser,
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
