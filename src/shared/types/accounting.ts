import dayjs from 'dayjs';

import { PublicUser, User } from './user';


export enum BalanceStatus {
  Pending = 'pending',
  Cancelled = 'cancelled',
  Confirmed = 'confirmed',
  Processing = 'processing'
};

export type Balance = {
  id: number,
  debit: number,
  credit: number,
  userId: User['id'],
  description: string,
  status: BalanceStatus,
  dateRequested: string | dayjs.Dayjs,
  dateConfirmed: string | dayjs.Dayjs,

  User?: PublicUser
};

export type BalanceRequest = {
  id?: number,
  debit: number,
  credit: number,
  userId: User['id'],
  description: string,
  status: BalanceStatus,
  dateRequested: string | dayjs.Dayjs,
  dateConfirmed?: string | dayjs.Dayjs
};
