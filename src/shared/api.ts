import i18next, { t } from 'i18next';
import { toast } from 'react-toastify';
import axios, { AxiosRequestConfig } from 'axios';

import { store } from '../store/store';
import authService from '../services/auth';
import { forceLogout } from '../store/features/auth/slice';


const port = process.env.NODE_ENV === 'production' ? '' : (':' + process.env.REACT_APP_API_PORT);
export const apiUrl = `https://${window.location.hostname}${port}/api/v1/`;


export const axiosConfig: AxiosRequestConfig = {
  headers: {
    'Lang': i18next.language,
    'Content-Type': 'application/json'
  },
  timeout: 10000, // ms
  withCredentials: true
};


const logoutWithError = (error: string) => {
  toast.error(error, {
    onClose: () => store.dispatch(forceLogout())
  });
};


axios.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    const { auth } = store.getState();

    // Cannot communicate with the server
    if (!error.response) {
      logoutWithError(t('api.network_error'));
    }

    // Request timed out
    if (error.response.status === 408) {
      logoutWithError(t('api.timeout'));
    }

    // Access token expired
    if (error.response.status === 401) {
      originalRequest._retry = true;
      const axiosApiInstance = axios.create();

      await authService.refreshAccessToken(auth.refreshToken);
      return axiosApiInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);
