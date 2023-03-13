import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const responseConfig = config;
  if (token) {
    responseConfig.headers.Authorization = `Bearer ${token}`;
  } else {
    const tmpToken =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaGF0MTRAZ21haWwuY29tIiwiaWF0IjoxNjc4NzA1NTk4LCJleHAiOjE2Nzg3OTE5OTh9.hyyJs5tF143_QQ2BjBCjkzApfSIqMnif5IY7zZEJyqYsWrlwMcQ1G-_O8a1tPyJqQW_6o2ZcytBoXThFkwLUzg';
    responseConfig.headers.Authorization = `Bearer ${tmpToken}`;
  }

  return responseConfig;
});

axiosClient.interceptors.response.use(
  (response) => {
    const { data } = response.data;
    return data || response.data;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
    }

    return Promise.reject(
      new Error(error?.response?.data?.error_message || 'Something went wrong.')
    );
  }
);

export default axiosClient;
