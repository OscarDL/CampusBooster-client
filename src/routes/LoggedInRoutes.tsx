import { FC } from 'react';
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
import Drawer from '../views/shared/Drawer';


const LoggedInRoutes: FC = () => (
  <div className="app">
    <Drawer/>

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


export default LoggedInRoutes;
