import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import LoginView from '../views/auth/Login';


const LoggedOutRoutes: FC = () => (
  <div className="app">
    <Routes>
      <Route path="/login" element={<LoginView/>}/>

      {/* Redirect to login page if not a route */}
      <Route path="*" element={<Navigate replace to="/login"/>}/>
    </Routes>
  </div>
);


export default LoggedOutRoutes;
