import axios from 'axios';
import { t } from 'i18next';

import { apiUrl, getAxiosConfig } from '../shared/api';
import { Teacher, TeacherRequest } from '../shared/types/teacher';


const getTeachers = async () => {
  try {
    const response = await axios.get(apiUrl + 'teachers', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createTeacher = async (teacher: TeacherRequest) => {
  try {
    const response = await axios.post(apiUrl + 'teachers', teacher, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateTeacher = async (teacher: TeacherRequest) => {
  try {
    const response = await axios.patch(apiUrl + 'teachers/' + teacher.id, teacher, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteTeacher = async (id: Teacher['id']) => {
  try {
    const response = await axios.delete(apiUrl + 'teachers/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const teacherService = {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher
};

export default teacherService;
