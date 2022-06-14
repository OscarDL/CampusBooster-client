import axios from 'axios';
import { t } from 'i18next';

import { apiUrl, getAxiosConfig } from '../shared/api';
import { Campus, CampusRequest } from '../shared/types/campus';


const getCampus = async (): Promise<Campus[]> => {
  try {
    const response = await axios.get(apiUrl + 'campus', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createCampus = async (campus: CampusRequest): Promise<Campus> => {
  try {
    const response = await axios.post(apiUrl + 'campus', campus, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateCampus = async (campus: Campus): Promise<Campus> => {
  try {
    const response = await axios.patch(apiUrl + 'campus/' + campus.id, campus, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteCampus = async (id: Campus['id']): Promise<void> => {
  try {
    const response = await axios.delete(apiUrl + 'campus/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const campusService = {
  getCampus,
  createCampus,
  updateCampus,
  deleteCampus
};

export default campusService;
