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
    }
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
}

/* FETCH FUNCTIONS */
//* CANDIDATES
export async function getCandidates(filtersArr, count, page) {
  return (await getCandidatesFull(filtersArr, count, page)).candidates;
}

export async function getCandidatesFull(filtersArr, count, page, fields = null) {
  const formattedFilters = formatCandidateFilters(filtersArr)
    .filter(filter => {
      if (['workAuthorized', 'willRelocate', 'activelyLooking'].includes(filter.key) && !filter.value) {
        return false
      }
      return true
    });

  const { data } = await API.post(ROUTES.APIcandidates, {
    'filters': formattedFilters,
    'count': count,
    'page': page || null,
    'fields': fields || null
  });
  return {
    candidates: normalizeData(data.candidates),
    total: data.total
  }
}

export async function getCandidateById(id) {
  const { data } = await API.get(ROUTES.APIcandidates, {
    params: {
      id
    }
  });
  return normalizeData(data.candidate);
}

export async function updateUser(newData, id) { // id is optional, if no id is passed it will update the user attached to the auth token
  const body = id ? { id, ...newData } : newData;
  const { data } = await API.post(ROUTES.APIuserUpdate, body);
  return normalizeData(data);
}

export async function updateCandidate(newData, id) {
  console.log({ newData, id })
  const body = { ...newData, id };
  const { data } = await API.post(ROUTES.APIcandidateUpdate, body);
  return normalizeData(data);
}

export async function getSavedCandidates() {
  const { data } = await API.get(ROUTES.APIsavedCandidates);
  return normalizeData(data.candidates);
