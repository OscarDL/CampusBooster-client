import axios from 'axios';
import { t } from 'i18next';

import { apiUrl, getAxiosConfig } from '../shared/api';
import { ToolLink, ToolLinkBase64Image } from '../shared/types/tool';


const axiosFormDataConfig = {
  ...getAxiosConfig(),
  headers: {
    ...getAxiosConfig().headers,
    'Content-Type': 'multipart/form-data'
  }
};


const getTools = async (): Promise<ToolLinkBase64Image[]> => {
  try {
    const response = await axios.get(apiUrl + 'tools', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const createTool = async (toolData: FormData): Promise<ToolLinkBase64Image> => {
  try {
    const response = await axios.post(apiUrl + 'tools', toolData, axiosFormDataConfig);
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const updateTool = async (id: ToolLink['id'], toolData: FormData): Promise<ToolLinkBase64Image> => {
  try {
    const response = await axios.patch(apiUrl + 'tools/' + id, toolData, axiosFormDataConfig);
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};

const deleteTool = async (id: ToolLink['id']): Promise<void> => {
  try {
    const response = await axios.delete(apiUrl + 'tools/' + id, getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const toolService = {
  getTools,
  createTool,
  updateTool,
  deleteTool
};

export default toolService;
