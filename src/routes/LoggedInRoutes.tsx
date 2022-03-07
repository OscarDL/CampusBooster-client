import { Navigate, Route, Routes } from 'react-router-dom';

import Summary from '../views/app/Summary';
import Settings from '../views/app/Settings';

import '../components/app/sidebar/Sidebar.css';
import MobileDrawer from '../components/app/sidebar/MobileDrawer';
import DesktopDrawer from '../components/app/sidebar/DesktopDrawer';


function LoggedInRoutes() {
  return (
    <div className="app">
      <DesktopDrawer/>

      <div className="app__content">
        <Routes>
          <Route path="/summary" element={<Summary/>}/>

          <Route path="/realtime" element={<Summary/>}/>

          <Route path="/settings" element={<Settings/>}/>

          {/* Redirect to the home page if the route doesn't exist */}
          <Route path="*" element={<Navigate replace to="/summary"/>}/>
        </Routes>
      </div>

      <MobileDrawer/>
    </div>
  );
};


export default LoggedInRoutes;
