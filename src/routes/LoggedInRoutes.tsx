import { Navigate, Route, Routes } from 'react-router-dom';

import Summary from '../views/app/Summary';
import Settings from '../views/app/Settings';
import Header from '../components/app/header/Header';


function LoggedInRoutes() {
  return (
    <div className="app">
      <Header/>

      <Routes>
        <Route path="/summary" element={<Summary/>}/>

        <Route path="/realtime" element={<Summary/>}/>

        <Route path="/settings" element={<Settings/>}/>

        {/* Redirect to the home page if the route doesn't exist */}
        <Route path="*" element={<Navigate replace to="/summary"/>}/>
      </Routes>
    </div>
  );
};


export default LoggedInRoutes;
