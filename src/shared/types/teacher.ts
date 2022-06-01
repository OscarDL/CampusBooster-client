import { PublicUser, User } from './user';
import { ClassroomHasCourse } from './classroom';


export type Teacher = {
  id: number,
  active: boolean,
  userId: User['id'],
  classroomHasCourseId: ClassroomHasCourse['id'],

  User: PublicUser,
  ClassroomHasCourse: ClassroomHasCourse,
};

export type TeacherRequest = {
  id?: number,
  active: boolean,
  userId: User['id'],
  classroomHasCourseId: ClassroomHasCourse['id']
};
