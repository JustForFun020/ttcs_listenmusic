import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-zingmp3-vercel.vercel.app/api',
});

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
