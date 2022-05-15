import axios from 'axios';
import { t } from 'i18next';

import { ToolLink } from '../shared/types/tools';
import { apiUrl, axiosConfig } from '../shared/api';


const axiosFormDataConfig = {
  ...axiosConfig,
  headers: {
    ...axiosConfig.headers,
    'Content-Type': 'multipart/form-data'
  }
};


const getTools = async () => {
  try {
    const response = await axios.get(apiUrl + 'tools', axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createTool = async (toolData: FormData) => {
  try {
    const response = await axios.post(apiUrl + 'tools', toolData, axiosFormDataConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateTool = async (id: ToolLink['id'], toolData: FormData) => {
  try {
    const response = await axios.patch(apiUrl + 'tools/' + id, toolData, axiosFormDataConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteTool = async (id: ToolLink['id']) => {
  try {
    const response = await axios.delete(apiUrl + 'tools/' + id, axiosConfig);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const toolsService = {
  getTools,
  createTool,
  updateTool,
  deleteTool
};

export default toolsService;
