import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../store/store';
import { categories } from '../shared/utils/values';
import { getLoggedInAuthState, getUserCategories } from '../shared/functions';

import Admin from './AdminRoutes';
import Drawer from '../views/shared/Drawer';
import Tools from '../views/app/tools/Tools';
import Users from '../views/app/users/Users';
import Grades from '../views/app/grades/Grades';
import Courses from '../views/app/courses/Courses';
import Profile from '../views/app/profile/Profile';
import Absences from '../views/app/absences/Absences';
import Planning from '../views/app/planning/Planning';
import Accounting from '../views/app/accounting/Accounting';
import Internships from '../views/app/internships/Internships';


const LoggedInRoutes: FC = () => {
  const { user } = useAppSelector(getLoggedInAuthState);

  const components: {[key: string]: JSX.Element} = {
    courses: <Courses/>,
    grades: <Grades/>,
    users: <Users/>,
    planning: <Planning/>,
    absences: <Absences/>,
    internships: <Internships/>,
    accounting: <Accounting/>,
    tools: <Tools/>,
    admin: <Admin/>
  };

  const paths: {[key: string]: string} = {
    courses: '/courses',
    grades: '/grades',
    users: '/users',
    planning: '/planning',
    absences: '/absences',
    internships: '/internships',
    accounting: '/accounting',
    tools: '/tools',
    admin: '/admin/*'
  };


  return (
    <>
      <Drawer/>

      <div className="app__content">
        <Routes>
          {getUserCategories(categories, user).map(category => (
            <Route key={category} path={paths[category]} element={components[category]}/>
          ))}

          <Route path="/profile" element={<Profile/>}/>

          {/* Redirect to the home page if the route doesn't exist */}
          <Route path="*" element={<Navigate replace to="/grades"/>}/>
        </Routes>
      </div>
    </>
  );
};


export default LoggedInRoutes;
