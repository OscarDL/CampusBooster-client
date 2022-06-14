import axios from 'axios';
import { t } from 'i18next';

import { AzureData, User } from '../shared/types/user';
import { apiUrl, getAxiosConfig } from '../shared/api';


type LoginData = {
  user: User,
  refreshToken: string
};
const login = async (azureData: AzureData): Promise<LoginData> => {
  try {
    const loginRequest = {
      azureId: azureData.localAccountId
    };

    const response = await axios.post(apiUrl + 'auth/login', loginRequest, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const logout = async (): Promise<void> => {
  try {
    await axios.get(apiUrl + 'auth/logout', getAxiosConfig());
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const refreshAccessToken = async (refreshToken: string): Promise<void> => {
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
