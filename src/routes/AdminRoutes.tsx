import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../store/store';
import { UserRoles } from '../shared/types/user';
import { getLoggedInAuthState } from '../shared/functions';

import BansView from '../views/app/admin/Bans';
import AdminView from '../views/app/admin/Admin';
import CampusView from '../views/app/admin/Campus';
import ClassroomsView from '../views/app/admin/Classrooms';


const AdminRoutes: FC = () => {
  const { user } = useAppSelector(getLoggedInAuthState);

  return (
    <Routes>
      <Route index element={<AdminView/>}/>
      <Route path="bans" element={<BansView/>}/>
      <Route path="classrooms" element={<ClassroomsView/>}/>
      {user.role === UserRoles.CampusBoosterAdmin && <Route path="campus" element={<CampusView/>}/>}

      {/* Redirect to the home admin page if the route doesn't exist */}
      <Route path="/admin/*" element={<Navigate replace to="/admin"/>}/>
    </Routes>
  );
};


export default AdminRoutes;
