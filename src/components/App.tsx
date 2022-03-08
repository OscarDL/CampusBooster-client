import { useEffect } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { userData, setUser } from '../store/features/auth/authSlice';

import Loader from './shared/Loader';
import LoggedInRoutes from '../routes/LoggedInRoutes';
import LoggedOutRoutes from '../routes/LoggedOutRoutes';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const dispatch = useDispatch();
  const {loading, user} = useSelector((state) => state.auth);


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
      {loading && <Loader fullscreen/>}

      {user ? (
        <Router>
          {user.id ? <LoggedInRoutes/> : <LoggedOutRoutes/>}
        </Router>
      ) : (
        <Loader fullscreen/>
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
