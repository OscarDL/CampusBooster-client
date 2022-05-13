import dayjs from 'dayjs';

import { User } from './user';


export type Balance = {
  id: number,
  debit: number,
  credit: number,
  status: string,
  userId: User['id'],
  description: string,
  dateRequested: dayjs.Dayjs,
  dateConfirmed: dayjs.Dayjs,
  User?: User
};
