import axios from 'axios';
import { t } from 'i18next';

import { Contract } from '../shared/types/contract';
import { apiUrl, getAxiosConfig } from '../shared/api';
import { User } from '../shared/types/user';


const axiosFormDataConfig = {
  ...getAxiosConfig(),
  headers: {
    ...getAxiosConfig().headers,
    'Content-Type': 'multipart/form-data'
  }
};


const getContracts = async () => {
  try {
    const response = await axios.get(apiUrl + 'contracts', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getUserContracts = async (id: User['id']) => {
  try {
    const response = await axios.get(apiUrl + 'contracts/user/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getSupervisorContracts = async (id: User['id']) => {
  try {
    const response = await axios.get(apiUrl + 'contracts/supervisor/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createContract = async (contractData: FormData) => {
  try {
    const response = await axios.post(apiUrl + 'contracts', contractData, axiosFormDataConfig);
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateContract = async (id: Contract['id'], contractData: FormData) => {
  try {
    const response = await axios.patch(apiUrl + 'contracts/' + id, contractData, axiosFormDataConfig);
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteContract = async (id: Contract['id']) => {
  try {
    const response = await axios.delete(apiUrl + 'contracts/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const contractService = {
  getContracts,
  getUserContracts,
  getSupervisorContracts,
  createContract,
  updateContract,
  deleteContract
};

export default contractService;
