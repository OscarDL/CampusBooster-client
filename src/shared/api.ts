import { AxiosRequestConfig } from 'axios';


const port = process.env.NODE_ENV === 'production' ? '' : ':9000';
export const apiUrl: string = `https://${window.location.hostname}${port}/api/v1/`;


export const axiosConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Api-Key': process.env.REACT_APP_API_KEY ?? ''
  },
  withCredentials: true
};
