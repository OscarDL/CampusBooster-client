import axios from 'axios';
import { t } from 'i18next';

import { AzureData } from '../shared/types/user';
import { apiUrl, axiosConfig } from '../shared/api';


const login = async (azureData: AzureData) => {
  try {
    const loginRequest = {
      azureId: azureData.localAccountId
    };

    const response = await axios.post(apiUrl + 'auth/login', loginRequest, axiosConfig);

    if (response.statusText !== 'OK') throw response;
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const logout = async () => {
  try {
    await axios.get(apiUrl + 'auth/logout', axiosConfig);
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const refreshAccessToken = async (refreshToken: string) => {
  try {
    await axios.post(apiUrl + 'auth/refresh', {refreshToken}, axiosConfig);
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const authService = {
  login,
  logout,
  refreshAccessToken
};

export default authService;
