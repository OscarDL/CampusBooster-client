import axios from 'axios';
import { UserLogin } from '../../../shared/interfaces/user';

import { apiUrl, axiosConfig } from '../../../shared/api';


const login = async (user: UserLogin) => {
  try {
    const {data} = await axios.post(apiUrl + 'auth/login', {user}, axiosConfig);

    return data.success ? data : data?.error;
  }

  catch (error: any) {
    return error.response?.data?.error || 'error';
  }
};

const getUserData = async () => {
  try {
    const {data} = await axios.get(apiUrl + 'auth/data', axiosConfig);

    return data.success ? data : data?.error;
  }

  catch (error: any) {
    return error.response?.data?.error || 'error';
  }
};

const logout = async () => {
  try {
    const {data} = await axios.get(apiUrl + 'auth/logout', axiosConfig);

    return data.success ? data : data?.error;
  }

  catch (error: any) {
    return error.response?.data?.error || 'error';
  }
};


const authService = {
  login,
  logout,
  getUserData
};

export default authService;
