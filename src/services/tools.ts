import axios from 'axios';
import { t } from 'i18next';

import { apiUrl, axiosConfig } from '../shared/api';


const getTools = async () => {
  try {
    const response = await axios.get(apiUrl + 'tools', axiosConfig);

    if (response.statusText !== 'OK') {
      throw response;
    }

    console.log('OK', response.data);
    return response.data;
  }
  
  catch (error: any) {
    return Promise.reject(error.response.data || t('api.error'));
  }
};


const toolsService = {
  getTools
};

export default toolsService;
