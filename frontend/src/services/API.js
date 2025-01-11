import axios from 'axios';
import AuthService from './auth';
import fixStringNulls from '../utils/fixStringNulls';
import * as ROUTES from '../routes';
import { ACTIVE_STATUSES } from '../utils/filterObjects';

const API = axios.create({
  baseURL: 'https://intulsadev.com:5000',
  // baseURL: 'http://localhost:3001',
});

// Adds Bearer token to every request when it exists (i.e. user is logged in)
API.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('id_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default API;

export function appendPathToBaseUrl(path) {
  if (path.slice(0, 4) === 'http') {
    return path; // It's already a full URL
  }
  return API.defaults.baseURL + path;
