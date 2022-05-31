import dayjs from 'dayjs';

import { PublicUser, User } from './user';


export enum BalanceStatus {
  pending = 'pending',
  cancelled = 'cancelled',
  confirmed = 'confirmed',
  processing = 'processing'
};

export type Balance = {
  id: number,
  debit: number,
  credit: number,
  description: string,
  status: BalanceStatus,
  dateRequested: string | dayjs.Dayjs,
  dateConfirmed: string | dayjs.Dayjs,
  userId: User['id'],
  studentName?: string,

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
