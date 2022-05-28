import { User } from './user';
import { Classroom } from './classroom';


export type Campus = {
  id: number,
  name: string,
  address: string,
  postCode: string,
  city: string,
  open: boolean,
  virtual: boolean,
  campusManagerId: User['id'],

  Users?: User[],
  Classrooms?: Classroom[]
};

export type UserCampus = {
  id: number,
  name: string,
  address: string,
  postCode: string,
  city: string,
  open: boolean,
  virtual: boolean,
  campusManagerId: User['id']
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
