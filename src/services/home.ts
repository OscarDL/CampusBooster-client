import axios from 'axios';
import { t } from 'i18next';

import { apiUrl, getAxiosConfig } from '../shared/api';


const getSummary = async () => {
  try {
    const response = await axios.get(apiUrl + 'home/summary', getAxiosConfig());
    return response.data;
  }

  catch (error: any) {
    return Promise.reject(error?.response?.data || t('api.error'));
  }
};


const homeService = {
  getSummary
};

export default homeService;
