import axios from 'axios';
import { t } from 'i18next';

import { User } from '../shared/types/user';
import { apiUrl, getAxiosConfig } from '../shared/api';
import { Grade, GradeRequest } from '../shared/types/grade';


const getGrades = async () => {
  try {
    const response = await axios.get(apiUrl + 'grades', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getUserGrades = async (id: User['id']) => {
  try {
    const response = await axios.get(apiUrl + 'grades/user/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createGrade = async (grade: GradeRequest) => {
  try {
    const response = await axios.post(apiUrl + 'grades', grade, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateGrade = async (grade: Partial<Grade>) => {
  try {
    const response = await axios.patch(apiUrl + 'grades/' + grade.id, grade, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteGrade = async (id: Grade['id']) => {
  try {
    const response = await axios.delete(apiUrl + 'grades/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const accountingService = {
  getGrades,
  getUserGrades,
  createGrade,
  updateGrade,
  deleteGrade
};

export default accountingService;
