import axios from 'axios';
import { t } from 'i18next';

import { User } from '../shared/types/user';
import { Absence } from '../shared/types/absence';
import { apiUrl, getAxiosConfig, getAxiosFormDataConfig } from '../shared/api';


const getAbsences = async (): Promise<Absence[]> => {
  try {
    const response = await axios.get(apiUrl + 'absences', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getUserAbsences = async (id: User['id']): Promise<Absence[]> => {
  try {
    const response = await axios.get(apiUrl + 'absences/user/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getSupervisorAbsences = async (id: User['id']): Promise<Absence[]> => {
  try {
    const response = await axios.get(apiUrl + 'absences/supervisor/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createAbsence = async (absenceData: FormData): Promise<Absence> => {
  try {
    const response = await axios.post(apiUrl + 'absences', absenceData, getAxiosFormDataConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateAbsence = async (id: Absence['id'], absenceData: FormData): Promise<Absence> => {
  try {
    const response = await axios.patch(apiUrl + 'absences/' + id, absenceData, getAxiosFormDataConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteAbsence = async (id: Absence['id']): Promise<void> => {
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
