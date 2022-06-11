import axios from 'axios';
import { t } from 'i18next';

import { User } from '../shared/types/user';
import { apiUrl, getAxiosConfig } from '../shared/api';
import { Planning, PlanningRequest } from '../shared/types/planning';


const getPlannings = async () => {
  try {
    const response = await axios.get(apiUrl + 'plannings', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getUserPlanning = async (id: User['id']) => {
  try {
    const response = await axios.get(apiUrl + 'plannings/user/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createPlanningEntry = async (planning: PlanningRequest) => {
  try {
    const response = await axios.post(apiUrl + 'plannings', planning, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updatePlanningEntry = async (planning: PlanningRequest) => {
  try {
    const response = await axios.patch(apiUrl + 'plannings/' + planning.id, planning, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deletePlanningEntry = async (id: Planning['id']) => {
  try {
    const response = await axios.delete(apiUrl + 'plannings/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const planningService = {
  getPlannings,
  getUserPlanning,
  createPlanningEntry,
  updatePlanningEntry,
  deletePlanningEntry
};

export default planningService;
