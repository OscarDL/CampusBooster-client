import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../store/store';
import { UserRoles } from '../shared/types/user';
import { getLoggedInAuthState } from '../shared/functions';
import { AdminRoutes as Admin } from '../shared/types/routing';

import BansView from '../views/app/admin/Bans';
import AdminView from '../views/app/admin/Admin';
import CampusView from '../views/app/admin/Campus';
import TeachersView from '../views/app/admin/Teachers';
import PlanningsView from '../views/app/admin/Plannings';
import ClassroomsView from '../views/app/admin/Classrooms';


const AdminRoutes: FC = () => {
  const { user } = useAppSelector(getLoggedInAuthState);

  return (
    <Routes>
      <Route index element={<AdminView/>}/>
      <Route path={Admin.bans} element={<BansView/>}/>
      <Route path={Admin.teachers} element={<TeachersView/>}/>
      <Route path={Admin.plannings} element={<PlanningsView/>}/>
      <Route path={Admin.classrooms} element={<ClassroomsView/>}/>
      {user.role === UserRoles.CampusBoosterAdmin && <Route path={Admin.campus} element={<CampusView/>}/>}

      {/* Redirect to the home admin page if the route doesn't exist */}
      <Route path="*" element={<Navigate replace to=""/>}/>
    </Routes>
  );
};


export default AdminRoutes;
