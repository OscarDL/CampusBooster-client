import axios from 'axios';
import { t } from 'i18next';

import { User } from '../shared/types/user';
import { apiUrl, getAxiosConfig } from '../shared/api';
import { Course, CourseRequest } from '../shared/types/course';


const getCourses = async (): Promise<Course[]> => {
  try {
    const response = await axios.get(apiUrl + 'courses', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getUserCourses = async (id: User['id']): Promise<Course[]> => {
  try {
    const response = await axios.get(apiUrl + 'courses/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createCourse = async (course: CourseRequest): Promise<Course> => {
  try {
    const response = await axios.post(apiUrl + 'courses', course, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateCourse = async (course: Course): Promise<Course> => {
  try {
    const response = await axios.patch(apiUrl + 'courses/' + course.id, course, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteCourse = async (id: Course['id']): Promise<void> => {
  try {
    const response = await axios.delete(apiUrl + 'courses/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const courseService = {
  getCourses,
  getUserCourses,
  createCourse,
  updateCourse,
  deleteCourse
};

export default courseService;
