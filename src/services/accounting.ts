import axios from 'axios';
import { t } from 'i18next';

import { User } from '../shared/types/user';
import { Balance } from '../shared/types/accounting';
import { apiUrl, axiosConfig } from '../shared/api';


const getBalances = async () => {
  try {
    const response = await axios.get(apiUrl + 'balances', axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getUserBalance = async (id: User['id']) => {
  try {
    const response = await axios.get(apiUrl + 'balances/user/' + id, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createBalance = async () => {
  try {
    const response = await axios.post(apiUrl + 'balances', null, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateBalance = async (id: number) => {
  try {
    const response = await axios.patch(apiUrl + 'balances/' + id, null, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteBalance = async (id: Balance['id']) => {
  try {
    const response = await axios.delete(apiUrl + 'balances/' + id, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const accountingService = {
  getBalances,
  getUserBalance,
  createBalance,
  updateBalance,
  deleteBalance
};

export default accountingService;
