import axios from 'axios';
import localEnvironment from '~/utils/localEnvironment';

export const axiosClient = axios.create({
  baseURL: localEnvironment.SERVER_LINK,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(localEnvironment.ASYNC_STORAGE_TOKEN_NAME);
  const responseConfig = config;
  if (token) {
    responseConfig.headers.Authorization = `Bearer ${token}`;
  }
  return responseConfig;
});

axiosClient.interceptors.response.use(
  (response) => {
    const { data } = response.data;
    return data || response.data;
  },
  (error) => {
    return Promise.reject(
      new Error(error?.response?.data?.error_message || 'Đã có lỗi xảy ra.')
    );
  }
);

export default axiosClient;
