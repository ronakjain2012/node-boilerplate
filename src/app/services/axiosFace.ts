import config from '@/config';
import axios from 'axios';
import { getRandomID } from '@/helper';
import logger from '@/logger';

const axiosFace = axios.create({
  headers: {
    'User-Agent': config.app.agent,
    'X-CSRF-TOKEN': getRandomID(),
  },
  timeout: 5000,
  maxContentLength: 200000,
  // httpAgent: config.app.agent,
  // httpsAgent: config.app.agent,
  validateStatus: (status) => {
    return status >= 200 && status < 300; // default
    // return true; // default
  },
});

axiosFace.interceptors.response.use(
  (response) => {
    if (config.app.externalApiLog) {
      console.log(response);
    }
    return response;
  },
  (error) => {
    if (config.app.externalApiLog) {
      console.log(error);
    }
    return Promise.reject(error);
  },
);

axiosFace.interceptors.request.use(
  (request) => {
    if (config.app.externalApiLog) {
      console.log(request);
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosFace;
