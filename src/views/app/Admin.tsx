import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AdminPanel from './admin/Panel';
import BannedUsersView from './admin/Bans';
import ClassroomsView from './admin/Classrooms';


const AdminView: FC = () => {
  return (
    <Routes>
      <Route index element={<AdminPanel/>}/>
      <Route path="bans" element={<BannedUsersView/>}/>
      <Route path="classrooms" element={<ClassroomsView/>}/>

      {/* Redirect to the home admin page if the route doesn't exist */}
      <Route path="/admin/*" element={<Navigate replace to="/admin"/>}/>
    </Routes>
  );
};


export default AdminView;
