import axios from 'axios';
import { t } from 'i18next';

import { User } from '../shared/types/user';
import { Absence } from '../shared/types/absence';
import { apiUrl, getAxiosConfig } from '../shared/api';


const axiosFormDataConfig = {
  ...getAxiosConfig(),
  headers: {
    ...getAxiosConfig().headers,
    'Content-Type': 'multipart/form-data'
  }
};


const getAbsences = async () => {
  try {
    const response = await axios.get(apiUrl + 'absences', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getUserAbsences = async (id: User['id']) => {
  try {
    const response = await axios.get(apiUrl + 'absences/user/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getSupervisorAbsences = async (id: User['id']) => {
  try {
    const response = await axios.get(apiUrl + 'absences/supervisor/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createAbsence = async (absenceData: FormData) => {
  try {
    const response = await axios.post(apiUrl + 'absences', absenceData, axiosFormDataConfig);
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateAbsence = async (id: Absence['id'], absenceData: FormData) => {
  try {
    const response = await axios.patch(apiUrl + 'absences/' + id, absenceData, axiosFormDataConfig);
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteAbsence = async (id: Absence['id']) => {
  try {
    const response = await axios.delete(apiUrl + 'absences/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const absenceService = {
  getAbsences,
  getUserAbsences,
  getSupervisorAbsences,
  createAbsence,
  updateAbsence,
  deleteAbsence
};

export default absenceService;
