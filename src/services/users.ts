import axios from 'axios';
import { t } from 'i18next';

import { apiUrl, axiosConfig } from '../shared/api';
import { Classroom } from '../shared/types/classroom';
import { User, UserRequest } from '../shared/types/user';


const getUsers = async () => {
  try {
    const response = await axios.get(apiUrl + 'users', axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getUserById = async (id: User['id']) => {
  try {
    const response = await axios.get(apiUrl + 'users/' + id, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createUser = async (user: UserRequest) => {
  try {
    const response = await axios.post(apiUrl + 'users', user, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateUser = async (user: UserRequest) => {
  try {
    const response = await axios.patch(apiUrl + 'users/' + user.id!, user, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteUser = async (id: User['id']) => {
  try {
    const response = await axios.delete(apiUrl + 'users/' + id, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const addUserToClassroom = async (id: User['id'], classrooms: (Classroom['id'])[]) => {
  try {
    const response = await axios.post(apiUrl + `users/${id}/addClassrooms`, classrooms, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const removeUserFromClassroom = async (id: User['id'], classrooms: (Classroom['id'])[]) => {
  try {
    const response = await axios.post(apiUrl + `users/${id}/removeClassrooms`, classrooms, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const userService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addUserToClassroom,
  removeUserFromClassroom
};

export default userService;
