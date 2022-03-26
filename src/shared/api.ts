import i18next from 'i18next';
import { AxiosRequestConfig } from 'axios';


const port = process.env.NODE_ENV === 'production' ? '' : ':' + process.env.API_PORT;
export const apiUrl = `https://${window.location.hostname}${port}/api/v1/`;


export const axiosConfig: AxiosRequestConfig = {
  headers: {
    'Lang': i18next.language,
    'Content-Type': 'application/json',
    'Api-Key': process.env.REACT_APP_API_KEY ?? ''
  },
  withCredentials: true
};
