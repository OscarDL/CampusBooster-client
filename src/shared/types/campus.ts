export type Campus = {
  id: number,
  open: boolean,
  virtual: boolean,
  name: string,
  city: string,
  address: string
};

export type CampusRequest = {
  open: boolean,
  virtual: boolean,
  name: string,
  city: string,
  address: string
};
