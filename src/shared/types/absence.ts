import { Planning } from './planning';
import { PublicUser, User } from './user';


export type Absence = {
  id: number,
  late: boolean,
  missing: boolean,
  reason: string,
  userId: User['id'],
  planningId: Planning['id'],

  User: PublicUser,
  Planning: Planning
};
