import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { Slide, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

import { colors } from '../shared/utils';
import LoggedInRoutes from '../routes/LoggedInRoutes';
import LoggedOutRoutes from '../routes/LoggedOutRoutes';
import { useAppContext } from '../context/app/Provider';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [{user}, appDispatch] = useAppContext();

  useEffect(() => {
    setTimeout(() => appDispatch({ user: {} }), 500);
  }, [appDispatch]);


  return (
    <div className="app">
      {user ? (
        <Router>
          {user?.id ? <LoggedInRoutes/> : <LoggedOutRoutes/>}
        </Router>
      ) : (
        <div className="loader">
          <BeatLoader color={colors.loader}/>
        </div>
      )}

      <ToastContainer
        draggable
        closeOnClick
        pauseOnHover
        theme="colored"
        pauseOnFocusLoss
        autoClose={3000}
        transition={Slide}
      />
    </div>
  );
};


export default App;
