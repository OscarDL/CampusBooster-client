import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Summary from '../views/app/Summary';
import Settings from '../views/app/Settings';

import '../components/app/sidebar/Sidebar.css';
import MobileDrawer from '../components/app/sidebar/MobileDrawerA';
import DesktopDrawer from '../components/app/sidebar/DesktopDrawer';


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

          <Route path="/realtime" element={<Summary/>}/>

          <Route path="/settings" element={<Settings/>}/>

          {/* Redirect to the home page if the route doesn't exist */}
          <Route path="*" element={<Navigate replace to="/summary"/>}/>
        </Routes>
      </div>
    </div>
  );
};


export default LoggedInRoutes;
