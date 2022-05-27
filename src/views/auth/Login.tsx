import { FC } from 'react';

import Login from '../../components/auth/Login';

import './Auth.css';


const LoginView: FC = () => {
  return (
    <div className="login">
      <Login/>
    </div>
  );
};


export default LoginView;
