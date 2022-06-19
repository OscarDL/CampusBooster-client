import { FC, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../store/store';
import { categories } from '../shared/utils/values';
import { AppCategories, AppRoutes } from '../shared/types/routing';
import { getLoggedInAuthState, getUserCategories } from '../shared/functions';

import Admin from './AdminRoutes';
import Gdpr from '../views/app/gdpr/Gdpr';
import Home from '../views/app/home/Home';
import Drawer from '../views/shared/Drawer';
import Tools from '../views/app/tools/Tools';
import Users from '../views/app/users/Users';
import Grades from '../views/app/grades/Grades';
import Courses from '../views/app/courses/Courses';
import Profile from '../views/app/profile/Profile';
import Absences from '../views/app/absences/Absences';
import Planning from '../views/app/planning/Planning';
import Contracts from '../views/app/contracts/Contracts';
import Accounting from '../views/app/accounting/Accounting';


const LoggedInRoutes: FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(getLoggedInAuthState);

  const [redirected, setRedirected] = useState(false);

  const components: {[key: string]: JSX.Element} = {
    home: <Home/>,
    courses: <Courses/>,
    grades: <Grades/>,
    users: <Users/>,
    planning: <Planning/>,
    absences: <Absences/>,
    contracts: <Contracts/>,
    accounting: <Accounting/>,
    tools: <Tools/>,
    admin: <Admin/>
  };

  const paths = Object.fromEntries(
    Object.entries(components).map(([key]) => [key, AppRoutes[key as AppCategories]])
  );


  useEffect(() => {
    if (!redirected) {
      setRedirected(true);
      const redirectUrl = sessionStorage.getItem('redirectUrl');

      // Redirect after login
      sessionStorage.removeItem('redirectUrl');
      if (redirectUrl) navigate(redirectUrl);
    }
  }, [navigate, redirected]);


  return (
    <>
      <Drawer/>

      <div className="app__content">
        <Routes>
          {getUserCategories(categories, user).map(category => (
            <Route key={category} path={paths[category]} element={components[category]}/>
          ))}

          <Route path={AppRoutes.profile} element={<Profile/>}/>
          <Route path={AppRoutes.gdpr} element={<Gdpr/>}/>

          {/* Redirect to the home page if the route doesn't exist */}
          <Route path="*" element={<Navigate replace to={AppRoutes.home}/>}/>
        </Routes>
      </div>
    </>
  );
};


export default LoggedInRoutes;
