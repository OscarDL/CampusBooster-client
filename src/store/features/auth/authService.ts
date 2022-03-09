import axios from 'axios';

import { apiUrl, axiosConfig } from '../../../shared/api';


const login = async (azureUid: string) => {
  try {
    const {data} = await axios.post(apiUrl + 'auth/login', {azureUid}, axiosConfig);

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
