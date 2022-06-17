import axios from 'axios';
import { t } from 'i18next';

import { Classroom } from '../shared/types/classroom';
import { apiUrl, getAxiosConfig } from '../shared/api';
import { User, UserRequest } from '../shared/types/user';


const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(apiUrl + 'users', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getUserById = async (id: User['id']): Promise<User> => {
  try {
    const response = await axios.get(apiUrl + 'users/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getUsersForTeacher = async (id: User['id']): Promise<User[]> => {
  try {
    const response = await axios.get(apiUrl + 'users/teacher/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

type CreatedUser = {
  user: User,
  isNew: boolean
};
const createUser = async (user: UserRequest): Promise<CreatedUser> => {
  try {
    const response = await axios.post(apiUrl + 'users', user, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateUser = async (user: UserRequest): Promise<User> => {
  try {
    const response = await axios.patch(apiUrl + 'users/' + user.id!, user, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateBannedUser = async (id: UserRequest['id'], banned: UserRequest['banned']): Promise<User> => {
  try {
    const response = await axios.patch(apiUrl + 'users/' + id!, {banned}, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const activateUser = async (userId: User['id']): Promise<User> => {
  try {
    const response = await axios.patch(apiUrl + `users/activate/${userId}`, {}, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const resetUserPassword = async (userId: User['id'], personalEmail: User['personalEmail']): Promise<User> => {
  try {
    const response = await axios.patch(apiUrl + `users/resetpassword/${userId}`, {personalEmail}, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteUser = async (id: User['id'], deleteInAD: boolean): Promise<void> => {
  try {
    if (deleteInAD) await axios.delete(apiUrl + 'users/azure/' + id, getAxiosConfig());

    const response = await axios.delete(apiUrl + 'users/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const addUserToClassrooms = async (id: User['id'], classrooms: (Classroom['id'])[]): Promise<User> => {
  try {
    const response = await axios.post(apiUrl + `users/classrooms/add/${id}`, {classrooms}, getAxiosConfig());
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const removeUserFromClassrooms = async (id: User['id'], classrooms: (Classroom['id'])[]): Promise<User> => {
  try {
    const response = await axios.post(apiUrl + `users/classrooms/remove/${id}`, {classrooms}, getAxiosConfig());
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const userService = {
  getUsers,
  getUserById,
  getUsersForTeacher,
  createUser,
  updateUser,
  updateBannedUser,
  activateUser,
  resetUserPassword,
  deleteUser,
  addUserToClassrooms,
  removeUserFromClassrooms
};

export default userService;
