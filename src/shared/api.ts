import i18next, { t } from 'i18next';
import axios, { AxiosRequestConfig } from 'axios';

import { store } from '../store/store';
import authService from '../services/auth';
import { forceLogout } from '../store/features/auth/slice';


const port = process.env.NODE_ENV === 'production' ? null : process.env.REACT_APP_API_PORT;
const domain = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : null;

export const apiUrl = process.env.NODE_ENV === 'production' ? (
  domain?.endsWith('/') ? domain : `${domain}/`
) : (
  `https://${window.location.hostname}:${port}/api/v1/`
);


export const getAxiosConfig = (): AxiosRequestConfig => ({
  headers: {
    'Lang': i18next.language,
    'Content-Type': 'application/json'
  },
  timeout: 10000, // ms
  withCredentials: true
});


axios.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    const { auth } = store.getState();

    // Cannot communicate with the server
    if (!error.response) {
      store.dispatch(
        forceLogout(t('api.network_error'))
      );
    }

    // Request timed out
    if (error.response.status === 408) {
      store.dispatch(
        forceLogout(t('api.timeout'))
      );
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
