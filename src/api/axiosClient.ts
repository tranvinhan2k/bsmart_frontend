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
