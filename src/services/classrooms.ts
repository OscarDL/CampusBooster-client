import axios from 'axios';
import { t } from 'i18next';

import { Course } from '../shared/types/course';
import { apiUrl, getAxiosConfig } from '../shared/api';
import { Classroom, ClassroomRequest } from '../shared/types/classroom';


const getClassrooms = async (): Promise<Classroom[]> => {
  try {
    const response = await axios.get(apiUrl + 'classrooms', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getClassroomById = async (id: Classroom['id']): Promise<Classroom> => {
  try {
    const response = await axios.get(apiUrl + 'classrooms/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createClassroom = async (classroom: Omit<ClassroomRequest, 'courses'>): Promise<Classroom> => {
  try {
    const response = await axios.post(apiUrl + 'classrooms', classroom, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateClassroom = async (classroom: Omit<ClassroomRequest, 'courses'>): Promise<Classroom> => {
  try {
    const response = await axios.patch(apiUrl + 'classrooms/' + classroom.id, classroom, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteClassroom = async (id: Classroom['id']): Promise<void> => {
  try {
    const response = await axios.delete(apiUrl + 'classrooms/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const addCoursesToClassroom = async (classroomId: Classroom['id'], courses: (Course['id'])[]): Promise<Classroom> => {
  try {
    const response = await axios.post(apiUrl + `classrooms/${classroomId}/courses/add`, {courses}, getAxiosConfig());
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const removeCoursesFromClassroom = async (classroomId: Classroom['id'], courses: (Course['id'])[]): Promise<Classroom> => {
  try {
    const response = await axios.post(apiUrl + `classrooms/${classroomId}/courses/remove`, {courses}, getAxiosConfig());
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const classroomService = {
  getClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  addCoursesToClassroom,
  removeCoursesFromClassroom
};

export default classroomService;
