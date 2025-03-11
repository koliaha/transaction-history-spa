// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Адрес мок-сервиса (например, json-server)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
