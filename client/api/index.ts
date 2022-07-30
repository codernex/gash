import axios from 'axios';
const baseURL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL,
  withCredentials: true
});

export default api;
