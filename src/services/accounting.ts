import axios from 'axios';
import { t } from 'i18next';

import { User } from '../shared/types/user';
import { apiUrl, getAxiosConfig } from '../shared/api';
import { Balance, BalanceRequest } from '../shared/types/accounting';


const getBalances = async (): Promise<Balance[]> => {
  try {
    const response = await axios.get(apiUrl + 'balances', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getUserBalance = async (id: User['id']): Promise<Balance[]> => {
  try {
    const response = await axios.get(apiUrl + 'balances/user/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createBalance = async (balance: BalanceRequest): Promise<Balance> => {
  try {
    const response = await axios.post(apiUrl + 'balances', balance, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateBalance = async (balance: Balance): Promise<Balance> => {
  try {
    const response = await axios.patch(apiUrl + 'balances/' + balance.id, balance, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteBalance = async (id: Balance['id']): Promise<void> => {
  try {
    const response = await axios.delete(apiUrl + 'balances/' + id, getAxiosConfig());
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
