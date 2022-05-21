import { User } from './user';
import { Campus } from './campus';


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

export type UserHasClassroom = {
  id: number,
  active: boolean,
  userId: User['id'],
  classroomId: Classroom['id'],

  User: User,
  Classroom: Classroom
};
