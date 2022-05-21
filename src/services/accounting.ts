import axios from 'axios';
import { t } from 'i18next';

import { User } from '../shared/types/user';
import { apiUrl, axiosConfig } from '../shared/api';
import { Balance, BalanceRequest } from '../shared/types/accounting';


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

const createBalance = async (balance: BalanceRequest) => {
  try {
    const response = await axios.post(apiUrl + 'balances', balance, axiosConfig);
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateBalance = async (balance: Balance) => {
  try {
    const response = await axios.patch(apiUrl + 'balances/' + balance.id, balance, axiosConfig);
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
