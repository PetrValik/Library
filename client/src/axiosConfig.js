import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // Update with your backend URL if different
});

export default instance;
