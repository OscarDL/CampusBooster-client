import axios from 'axios';

import { AzureData } from '../shared/types/user';
import { apiUrl, axiosConfig } from '../shared/api';


const login = async (azureData: AzureData) => {
  try {
    const loginRequest = {
      azureId: azureData.localAccountId
    };

    const response = await axios.post(apiUrl + 'auth/login', loginRequest, axiosConfig);

    if (response.statusText !== 'OK') {
      throw response;
    }

    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error.response.data.message || 'error');
  }
};

const logout = async () => {
  try {
    return await axios.get(apiUrl + 'auth/logout', axiosConfig);
  }

  catch (error: any) {
    return Promise.reject(error.response.data.message || 'error');
  }
};


const authService = {
  login,
  logout
};

export default authService;
