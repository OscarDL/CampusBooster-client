import axios from 'axios';
import { t } from 'i18next';

import { apiUrl, axiosConfig } from '../shared/api';
import { Classroom, ClassroomRequest } from '../shared/types/classroom';


const getClassrooms = async () => {
  try {
    const response = await axios.get(apiUrl + 'classrooms', axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getClassroomById = async (id: Classroom['id']) => {
  try {
    const response = await axios.get(apiUrl + 'classrooms/' + id, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createClassroom = async (classroom: ClassroomRequest) => {
  try {
    const response = await axios.post(apiUrl + 'classrooms', classroom, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateClassroom = async (classroom: Classroom) => {
  try {
    const response = await axios.patch(apiUrl + 'classrooms/' + classroom.id, classroom, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteClassroom = async (id: Classroom['id']) => {
  try {
    const response = await axios.delete(apiUrl + 'classrooms/' + id, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const userService = {
  getClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom
};

export default userService;
