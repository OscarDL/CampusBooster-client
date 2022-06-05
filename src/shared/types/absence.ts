import { Planning } from './planning';
import { PublicUser, User } from './user';


export enum AbsencePeriod {
  FullDay = 'FULL_DAY',
  Morning = 'MORNING',
  Afternoon = 'AFTERNOON',
  EarlyMorning = 'EARLY_MORNING',
  EarlyAfternoon = 'EARLY_AFTERNOON',
  LateMorning = 'LATE_MORNING',
  LateAfternoon = 'LATE_AFTERNOON'
};

export type Absence = {
  id: number,
  reason: string,
  late: boolean,
  period: AbsencePeriod,
  userId: User['id'],
  planningId: Planning['id'],

  fileKeys: string[],
  fileBase64: string[],

  User: PublicUser,
  Planning: Planning
};

export type AbsenceRequest = {
  id?: number,
  reason: string,
  late: boolean,
  period: AbsencePeriod,
  userId: User['id'],
  planningId: Planning['id']
};
