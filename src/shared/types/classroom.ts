import { User } from './user';
import { Campus } from './campus';
import { Course } from './course';


export type Classroom = {
  id: number,
  name: string,
  promotion: number,
  campusId?: Campus['id']
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
  courseId: Course['id'],
  classroomId: Classroom['id'],

  Course: Course,
  Classroom: Classroom
};

export type UserHasClassroom = {
  id: number,
  active: boolean,
  userId: User['id'],
  classroomId: Classroom['id'],

  User: User,
  Classroom: Classroom
};
