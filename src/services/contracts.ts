import axios from 'axios';
import { t } from 'i18next';

import { User } from '../shared/types/user';
import { Contract } from '../shared/types/contract';
import { apiUrl, getAxiosConfig, getAxiosFormDataConfig } from '../shared/api';


const getContracts = async (): Promise<Contract[]> => {
  try {
    const response = await axios.get(apiUrl + 'contracts', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getUserContracts = async (id: User['id']): Promise<Contract[]> => {
  try {
    const response = await axios.get(apiUrl + 'contracts/user/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getSupervisorContracts = async (id: User['id']): Promise<Contract[]> => {
  try {
    const response = await axios.get(apiUrl + 'contracts/supervisor/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createContract = async (contractData: FormData): Promise<Contract> => {
  try {
    const response = await axios.post(apiUrl + 'contracts', contractData, getAxiosFormDataConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateContract = async (id: Contract['id'], contractData: FormData): Promise<Contract> => {
  try {
    const response = await axios.patch(apiUrl + 'contracts/' + id, contractData, getAxiosFormDataConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteContract = async (id: Contract['id']): Promise<void> => {
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
