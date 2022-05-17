import { FC } from 'react';

import { User } from '../../../../shared/types/user';


type Props = {
  users: User[]
};


const UserTab: FC<Props> = ({users}) => {
  return (
    <>
      {users.sort((a, b) => a.firstName.localeCompare(b.firstName)).map(user => (
        user.firstName + ' ' + user.lastName
      ))}
    </>
  );
};


export default UserTab;
