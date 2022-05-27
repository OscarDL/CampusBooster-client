import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import BansView from '../views/app/admin/Bans';
import AdminView from '../views/app/admin/Admin';
import CampusView from '../views/app/admin/Campus';
import ClassroomsView from '../views/app/admin/Classrooms';


const AdminRoutes: FC = () => {
  return (
    <Routes>
      <Route index element={<AdminView/>}/>
      <Route path="bans" element={<BansView/>}/>
      <Route path="campus" element={<CampusView/>}/>
      <Route path="classrooms" element={<ClassroomsView/>}/>

      {/* Redirect to the home admin page if the route doesn't exist */}
      <Route path="/admin/*" element={<Navigate replace to="/admin"/>}/>
    </Routes>
  );
};


export default AdminRoutes;
