import i18next, { t } from 'i18next';
import { toast } from 'react-toastify';
import axios, { AxiosRequestConfig } from 'axios';


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


axios.interceptors.response.use(
  response => {
    return response;
  },

  error => {
    // Cannot communicate with the server
    if (!error.response) {
      toast.error(t('api.network_error'), {
        onClose: () => {
          // Reset to the initial state
          window.location.pathname = '/login';
        }
      });
    }

    // Request timed out
    if (error.response.status === 408) {
      toast.error(t('api.timeout'), {
        onClose: () => {
          // Reset to the initial state
          window.location.pathname = '/login';
        }
      });
    }

    return Promise.reject(error);
  }
);
