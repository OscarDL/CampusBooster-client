import axios from 'axios';
import { t } from 'i18next';

import { AzureData } from '../shared/types/user';
import { apiUrl, getAxiosConfig } from '../shared/api';


const login = async (azureData: AzureData) => {
  try {
    const loginRequest = {
      azureId: azureData.localAccountId
    };

    const response = await axios.post(apiUrl + 'auth/login', loginRequest, getAxiosConfig());

    console.log(1)
    console.log(response)
    if (response.statusText !== 'OK') throw response;
    return response.data;
  }

  catch (error: any) {
    console.log(2)
    console.log(error)
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const logout = async () => {
  try {
    await axios.get(apiUrl + 'auth/logout', getAxiosConfig());
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const refreshAccessToken = async (refreshToken: string) => {
  try {
    await axios.post(apiUrl + 'auth/refresh', {refreshToken}, getAxiosConfig());
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
