import { User } from './user';
import { Classroom } from './classroom';


export type Campus = {
  id: number,
  name: string,
  city: string,
  address: string,
  open: boolean,
  virtual: boolean,

  Classrooms: Classroom[],
  Users: User[]
};

export type UserCampus = {
  id: number,
  name: string,
  city: string,
  address: string,
  open: boolean,
  virtual: boolean
};

export type CampusRequest = {
  id?: number,
  name: string,
  city: string,
  address: string,
  open: boolean,
  virtual: boolean
};
