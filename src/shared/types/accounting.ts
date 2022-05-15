import dayjs from 'dayjs';

import { User } from './user';


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
  User?: User,
  userId: User['id'],
  studentName?: string
};

export type BalanceRequest = {
  debit: number,
  credit: number,
  userId: User['id'],
  description: string,
  status: BalanceStatus,
  dateRequested: string | dayjs.Dayjs
};
