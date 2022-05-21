import axios from 'axios';
import { t } from 'i18next';

import { apiUrl, axiosConfig } from '../shared/api';
import { Campus, CampusRequest } from '../shared/types/campus';


const getCampus = async () => {
  try {
    const response = await axios.get(apiUrl + 'campus', axiosConfig);
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getCampusById = async (id: Campus['id']) => {
  try {
    const response = await axios.get(apiUrl + 'campus/' + id, axiosConfig);
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createCampus = async (campus: CampusRequest) => {
  try {
    const response = await axios.post(apiUrl + 'campus', campus, axiosConfig);
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateCampus = async (campus: Campus) => {
  try {
    const response = await axios.patch(apiUrl + 'campus/' + campus.id, campus, axiosConfig);
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteCampus = async (id: Campus['id']) => {
  try {
    const response = await axios.delete(apiUrl + 'campus/' + id, axiosConfig);
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const campusService = {
  getCampus,
  getCampusById,
  createCampus,
  updateCampus,
  deleteCampus
};

export default campusService;
