import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Define base URL
  headers: { 'Content-Type': 'application/json' },
//   timeout: 5000,
});

export default api;
