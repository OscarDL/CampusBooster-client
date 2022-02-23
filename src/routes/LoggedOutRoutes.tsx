import { Navigate, Route, Routes } from 'react-router-dom';

import LoginView from '../views/auth/Login';


function LoggedOutRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView/>}/>

      {/* Redirect to login page if not a route */}
      <Route path="*" element={<Navigate replace to="/login"/>}/>
    </Routes>
  );
};


export default LoggedOutRoutes;
