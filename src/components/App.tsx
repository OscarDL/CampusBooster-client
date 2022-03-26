import { FC, useEffect } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

import Loader from './shared/loader/Loader';
import { getCategoryTitle } from '../shared/utils';
import { login } from '../store/features/auth/slice';
import LoggedInRoutes from '../routes/LoggedInRoutes';
import LoggedOutRoutes from '../routes/LoggedOutRoutes';
import { setCategory } from '../store/features/app/slice';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


const App: FC = () => {
  const dispatch = useDispatch();
  const { accounts: [azureData] } = useMsal();
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    if (!user && azureData) {
      dispatch(login(azureData));
    }

    if (user) {
      dispatch(setCategory(getCategoryTitle()));
    }
  }, [azureData, user, dispatch]);


  return (
    <div>
      <Router>
        <AuthenticatedTemplate>
          {user ? (
            <LoggedInRoutes/>
          ) : (
            // User data is not retrieved from the database yet
            <Loader fullscreen/>
          )}
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <LoggedOutRoutes/>
        </UnauthenticatedTemplate>
      </Router>

      <ToastContainer
        theme="colored"
        autoClose={3000}
        transition={Slide}
      />
    </div>
  );
};


export default App;
