import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // ✅ keep this
  withCredentials: true,
});

export default axiosInstance;
