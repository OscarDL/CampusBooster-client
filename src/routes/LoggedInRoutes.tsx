import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../store/store';
import { categories } from '../shared/utils/values';
import { getLoggedInAuthState, getUserCategories } from '../shared/functions';

import Summary from '../views/app/Summary';
import Subjects from '../views/app/Subjects';
import Grades from '../views/app/Grades';
import Users from '../views/app/Users';
import Planning from '../views/app/Planning';
import Absences from '../views/app/Absences';
import Internships from '../views/app/Internships';
import Accounting from '../views/app/Accounting';
import Admin from '../views/app/Admin';
import Tools from '../views/app/Tools';
import Profile from '../views/app/Profile';
import Drawer from '../views/shared/Drawer';


const LoggedInRoutes: FC = () => {
  const { user } = useAppSelector(getLoggedInAuthState);

  const components: {[key: string]: JSX.Element} = {
    summary: <Summary/>,
    subjects: <Subjects/>,
    grades: <Grades/>,
    users: <Users/>,
    planning: <Planning/>,
    absences: <Absences/>,
    internships: <Internships/>,
    accounting: <Accounting/>,
    admin: <Admin/>,
    tools: <Tools/>
  };


  return (
    <>
      <Drawer/>

      <div className="app__content">
        <Routes>
          {getUserCategories(categories, user).map(category => (
            <Route key={category} path={'/' + category} element={components[category]}/>
          ))}

          <Route path="/profile" element={<Profile/>}/>

          {/* Redirect to the home page if the route doesn't exist */}
          <Route path="*" element={<Navigate replace to="/summary"/>} />
        </Routes>
      </div>
    </>
  );
};


export default LoggedInRoutes;
