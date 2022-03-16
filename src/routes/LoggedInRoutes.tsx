import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Summary from '../views/app/Summary';
import Subjects from '../views/app/Subjects';
import Marks from '../views/app/Marks';
import Students from '../views/app/Students';
import Absences from '../views/app/Absences';
import Internships from '../views/app/Internships';
import Accounting from '../views/app/Accounting';
import Admin from '../views/app/Admin';
import Settings from '../views/app/Settings';

import MobileDrawer from '../components/app/drawers/MobileDrawer';
import DesktopDrawer from '../components/app/drawers/DesktopDrawer';

import '../components/app/drawers/Drawers.css';


function LoggedInRoutes() {
  const [mobile, setMobile] = useState(document.body.clientWidth <= 768);


  useEffect(() => {
    // Since the mobile drawer component from MUI is injected into the DOM,
    // We can't show / hide it reliably in a clean way with CSS media queries.
    const chooseDrawer = () => {
      setMobile(document.body.clientWidth <= 768);
    };

    window.addEventListener('resize', chooseDrawer)

    return () => window.removeEventListener('resize', chooseDrawer);
  }, [setMobile]);


  return (
    <div className="app">
      {mobile ? <MobileDrawer/> : <DesktopDrawer/>}

      <div className="app__content">
        <Routes>
          <Route path="/summary" element={<Summary/>}/>

          <Route path="/subjects" element={<Subjects/>}/>

          <Route path="/marks" element={<Marks/>}/>

          <Route path="/students" element={<Students/>}/>

          <Route path="/absences" element={<Absences/>}/>

          <Route path="/internships" element={<Internships/>}/>

          <Route path="/accounting" element={<Accounting/>}/>

          <Route path="/admin" element={<Admin/>}/>

          <Route path="/settings" element={<Settings/>}/>

          {/* Redirect to the home page if the route doesn't exist */}
          <Route path="*" element={<Navigate replace to="/summary"/>}/>
        </Routes>
      </div>
    </div>
  );
};


export default LoggedInRoutes;
