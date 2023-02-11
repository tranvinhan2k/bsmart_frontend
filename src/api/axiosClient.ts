import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
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
    if (error.response.status === 401) {
      localStorage.removeItem('token');
    }

    return Promise.reject(
      new Error(error?.response?.data?.error_message || 'Something went wrong.')
    );
  }
);

export default axiosClient;
