import { Classroom } from './classroom';
import { PublicUser, User } from './user';


export type Campus = {
  id: number,
  name: string,
  address: string,
  postCode: string,
  city: string,
  open: boolean,
  virtual: boolean,

  Users?: User[],
  Classrooms?: Classroom[],
  CampusManager?: PublicUser
};

export type CampusRequest = {
  id?: number,
  name: string,
  address: string,
  postCode: string,
  city: string,
  open: boolean,
  virtual: boolean,
  campusManagerId: User['id']
};
