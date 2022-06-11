import axios from 'axios';
import { t } from 'i18next';

import { User } from '../shared/types/user';
import { apiUrl, getAxiosConfig } from '../shared/api';
import { Project, ProjectRequest } from '../shared/types/project';


const getProjects = async () => {
  try {
    const response = await axios.get(apiUrl + 'projects', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const getUserProjects = async (id: User['id']) => {
  try {
    const response = await axios.get(apiUrl + 'projects/user/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createProject = async (project: ProjectRequest) => {
  try {
    const response = await axios.post(apiUrl + 'projects', project, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateProject = async (project: ProjectRequest) => {
  try {
    const response = await axios.patch(apiUrl + 'projects/' + project.id, project, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteProject = async (id: Project['id']) => {
  try {
    const response = await axios.delete(apiUrl + 'projects/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const projectService = {
  getProjects,
  getUserProjects,
  createProject,
  updateProject,
  deleteProject
};

export default projectService;
