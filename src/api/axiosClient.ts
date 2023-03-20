import axios from 'axios';
import localEnvironment from '~/utils/localEnvironment';

export const axiosClient = axios.create({
  baseURL: localEnvironment.SERVER_LINK,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem(localEnvironment.ASYNC_STORAGE_TOKEN_NAME);
  const responseConfig = config;
  if (token) {
    responseConfig.headers.Authorization = `Bearer ${token}`;
  }

  return responseConfig;
});

axiosClient.interceptors.response.use(
  function (response) {
    const { data } = response.data;
    return data || response.data;
  },
  function (error) {
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
    }

    return Promise.reject(
      new Error(error?.response?.data?.error_message || 'Something went wrong.')
    );
  }
);

export default axiosClient;
