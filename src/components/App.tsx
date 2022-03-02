import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { AccountInfo } from '@azure/msal-browser';
import { Slide, ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { colors } from '../shared/utils';
import AzureAuthenticationButton from '../azure/auth/Button';
import { userData, setUser } from '../store/features/auth/authSlice';

import LoggedInRoutes from '../routes/LoggedInRoutes';
import LoggedOutRoutes from '../routes/LoggedOutRoutes';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState<AccountInfo>();

  const onAuthenticated = async (userAccountInfo: AccountInfo) => {
    setCurrentUser(userAccountInfo);
  };

  // Render JSON data in readable format
  const PrettyPrintJson = ({ data }: any) => {
    return (
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };


  useEffect(() => {
    if (!user) {
      // Check signed in state
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      if (!isLoggedIn) {
        dispatch(setUser({}));
      }
      else {
        dispatch(userData());
      }
    }
  }, [user, dispatch]);


  return (
    <div>
      <h2>Microsoft Login Button application</h2>
      <AzureAuthenticationButton onAuthenticated={onAuthenticated}/>
      {currentUser && <PrettyPrintJson data={currentUser}/>}

      {loading && <BeatLoader color={colors.loader}/>}

      {user ? (
        <Router>
          {user.id ? <LoggedInRoutes/> : <LoggedOutRoutes/>}
        </Router>
      ) : (
        <div className="loader">
          <BeatLoader color={colors.loader}/>
        </div>
      )}

      <ToastContainer
        theme="colored"
        autoClose={3000}
        transition={Slide}
      />
    </div>
  );
};


export default App;
