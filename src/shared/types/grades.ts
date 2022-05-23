import { User, Teacher } from './user';
import { ClassroomHasCourse } from './classroom';


export type Grade = {
  id: number,
  max: number,
  grade: number,
  comment: string,
  userId: User['id'],
  teacherId: Teacher['id'],
  classroomHasCourseId: ClassroomHasCourse['id'],

  User: User,
  ClassroomHasCourse: ClassroomHasCourse
};

export type GradeRequest = {
  id?: number,
  max: number,
  grade: number,
  comment: string,
  userId: User['id'],
  teacherId: Teacher['id'],
  classroomHasCourseId: ClassroomHasCourse['id']
};
