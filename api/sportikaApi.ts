import axios from 'axios';

const sportikaApi = axios.create({
  baseURL: '/api',
});

export default sportikaApi;
