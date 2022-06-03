import axios from 'axios';
import { t } from 'i18next';

import { User } from '../shared/types/user';
import { apiUrl, getAxiosConfig } from '../shared/api';
import { Contract, ContractRequest } from '../shared/types/contract';


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

const createContract = async (contract: ContractRequest) => {
  try {
    const response = await axios.post(apiUrl + 'contracts', contract, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateContract = async (contract: Contract) => {
  try {
    const response = await axios.patch(apiUrl + 'contracts/' + contract.id, contract, getAxiosConfig());
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
