import { User } from './user';
import { Campus } from './campus';


export type Classroom = {
  id: number,
  section: number,
  campusId: Campus['id']
};

export type UserHasClassroom = {
  id: number,
  active: boolean,
  userId: User['id'],
  classroomId: Classroom['id'],

  User: User,
  Classroom: Classroom
};
