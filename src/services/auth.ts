import axios from 'axios';

import { AzureData } from '../shared/types/user';
import { apiUrl, axiosConfig } from '../shared/api';


const login = async (azureData: AzureData) => {
  try {
    const loginRequest = {
      email: azureData.username,
      azureId: azureData.localAccountId
    };
    const { data } = await axios.post(apiUrl + 'auth/login', loginRequest, axiosConfig);

    return data.success ? data : data?.error;
  }

  catch (error: any) {
    return error.response?.data?.error || 'error';
  }
};

const logout = async () => {
  try {
    const { data } = await axios.get(apiUrl + 'auth/logout', axiosConfig);

    return data.success ? data : data?.error;
  }

  catch (error: any) {
    return error.response?.data?.error || 'error';
  }
};


const authService = {
  login,
  logout
};

export default authService;
