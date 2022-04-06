import { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import LoginView from '../views/auth/Login';


const LoggedOutRoutes: FC = () => {
  useEffect(() => {
    const app = document.querySelector('.app')!;
    app.classList.add('auth');
  
    return () => app.classList.remove('auth');
  }, []);


  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginView/>}/>

        {/* Redirect to login page if not a route */}
        <Route path="*" element={<Navigate replace to="/login"/>}/>
      </Routes>
    </>
  );
};


export default LoggedOutRoutes;
