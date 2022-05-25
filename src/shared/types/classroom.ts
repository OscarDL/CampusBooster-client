import { Campus } from './campus';
import { Course } from './course';
import { Planning } from './planning';
import { Teacher, User } from './user';


export type Classroom = {
  id: number,
  name: string,
  promotion: number,
  campusId?: Campus['id'],

  ClassroomHasCourses: ClassroomHasCourse[]
};

export type ClassroomRequest = {
  id?: number,
  name: string,
  promotion: number,
  campusId?: Campus['id']
};

export type ClassroomHasCourse = {
  id: number,
  activated: boolean,
  teacherId: User['id'],
  courseId: Course['id'],
  classroomId: Classroom['id'],

  Course?: Course,
  Teachers?: Teacher[],
  Classroom?: Classroom,
  Plannings?: Planning[]
};

export type UserHasClassroom = {
  id: number,
  active: boolean,
  userId: User['id'],
  classroomId: Classroom['id'],

  User?: User,
  Classroom?: Classroom
};
