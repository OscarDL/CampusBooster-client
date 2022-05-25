import { User } from './user';
import { Classroom } from './classroom';


export type Campus = {
  id: number,
  name: string,
  city: string,
  address: string,
  open: boolean,
  virtual: boolean,

  Users?: User[],
  Classrooms?: Classroom[]
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
