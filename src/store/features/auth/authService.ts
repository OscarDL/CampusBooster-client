import axios from 'axios';

import { AzureUser } from '../../../shared/types/user';
import { apiUrl, axiosConfig } from '../../../shared/api';


const login = async (azureUser: AzureUser) => {
  try {
    const {data} = await axios.post(apiUrl + 'auth/login', {azureUser}, axiosConfig);

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
