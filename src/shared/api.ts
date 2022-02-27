import { AxiosRequestConfig } from 'axios';

export const apiUrl: string = (process.env.NODE_ENV === 'production') ? '/api/v1/' : 'https://localhost:9000/api/v1/';

export const axiosConfig: AxiosRequestConfig = {
  headers: {
    'content-type': 'application/json',
    'api-key': process.env.REACT_APP_API_KEY ?? ''
  },
  withCredentials: true
};
