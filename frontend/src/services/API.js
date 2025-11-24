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
}

export async function saveCandidate(userId, candidateId) {
  const { data } = await API.put(ROUTES.APItoggleSaveCandidate, {
    'company': userId,
    'candidate': candidateId,
  });

  if (data.messsage === 'saved candidate') {
    AuthService.toggleSavedCandidate(candidateId, 'save');
  } else {
    AuthService.toggleSavedCandidate(candidateId, 'unsave');
  }
  return normalizeData(data);
}

// COORDINATOR AUTH REQUIRED (handled on back-end), can be used to add any user type
export async function addUser(userObject) {
  try {
    const { data } = await API.post(ROUTES.APIaddUser, userObject);
    return normalizeData(data);
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function updateJob({ id, status, featured }) {
  const { data } = await API.patch(ROUTES.APIjobBase, {
    id,
    status,
    featured
  });
  return normalizeData(data);
}

//* COMPANIES
export async function getCompanies(filterValue, filterKey, count, page) {
  return (await getCompaniesFull(filterValue, filterKey, count, page)).companies;
}

export async function getCompaniesFull(filterValue, filterKey, count, page) {
  const { data } = await API.post(ROUTES.APIcompanies, {
    'filters': [
      {
        'key': filterKey || 'name',
        'value': filterValue || '',
      }
    ],
    'count': count || 5,
    'page': page || null
  });
  return {
    companies: normalizeData(data.companies),
    total: data.total,
  }
}

export async function getIndividualCompany(id) {
  const {data} = await API.get(ROUTES.APIcompanies, {
    params: {
      id
    }
  });
  return data.company
}

export async function getCompanyById(id) {
  const company = await getIndividualCompany(id);
  return company;
}

export async function getClientContacts(filterValue, filterKey, count) {
  const { data } = await API.post(ROUTES.APIclientContacts, {
    'filters': {
      [filterKey || 'clientCorporation']: filterValue || '',
    },
    'count': count
  });
  return normalizeData(data.clientContacts)
}


export async function saveCompany(candidateId, companyId) {
  const { data } = await API.put(ROUTES.APItoggleSaveCompany, {
    'company': companyId,
    'candidate': candidateId,
  });

  if (data.messsage === 'saved company') {
    AuthService.toggleSavedCompany(companyId, 'save');
  } else {
    AuthService.toggleSavedCompany(companyId, 'unsave');
  }
  return normalizeData(data);
}

export async function getSavedCompanies(id, count = null, page = null) {
  const params = id ? { candidate: id } : {}; // If no id is passed, will default to logged in user
  const { data } = await API.get(ROUTES.APIsavedCompanies, {
    params: {
      count,
      page,
      ...params
    }
  });
  return normalizeData(data.companies);
}

//* JOBS
/**
 * example filtersArr:
 * [
 *  {
 *   key: 'title',
 *   value: 'Software'
 *  },
 *  ...
 * ] 
 */
export async function getJobs(filters, count, operator, page) {
  return (await getJobsFull(filters, count, operator, page)).jobs;
}

export async function getJobsFull(filters, count, operator, page) {
  const filtersObj = filtersArrToObj(filters)

  if (filtersObj.expertise) {
    const categories = JSON.parse(localStorage.getItem('categories'));
    const categoryId = categories.find(category => category.name === filtersObj.expertise).externalID;
    filtersObj.expertise = categoryId
  }

  const formattedFilters = formatFilters(filtersObj, {
    'expertise': 'categoryId'
  });

  const { data } = await API.post(ROUTES.APIjobs, {
    'filters': formattedFilters,
    'count': count || 5,
    'page': page || null,
    'operator': operator || 'AND'
  });

  return {
    jobs: normalizeData(data.jobs),
    total: data.total,
  }
}

export async function getJobById(id) {
  const { data } = await API.get(ROUTES.APIjobs, {
    params: {
      id
    }
  });
  return normalizeData(data.job);
}

export async function getAppliedJobs(id) {
  const params = id ? { candidate: id } : {}; // If no id is passed, will default to logged in user
  const { data } = await API.get(ROUTES.APIappliedJobs, {
    params
  });
  return normalizeData(data.jobs);
}


export async function getInvitationsToApply(id) {
  const params = id ? { userId: id } : {}; // If no id is passed, will default to logged in user
  const { data } = await API.get(ROUTES.APIInvitedJobs, {
    params
  });
  return normalizeData(data.jobs);
}

export async function applyToJob(jobId, candidateId) {
  const { data } = await API.get(ROUTES.APIjobApply, {
    params: {
      job: jobId,
      candidate: candidateId
    }
  });
  return normalizeData(data);
}

export async function saveJob(candidateId, jobId) {
  const { data } = await API.put(ROUTES.APItoggleSaveJob, null, {
    params: {
      'candidate': candidateId,
      'job': jobId
    }
  });

  if (data.messsage === 'saved job') {
    AuthService.toggleSavedJob(jobId, 'save');
  } else {
    AuthService.toggleSavedJob(jobId, 'unsave');
  }
  return normalizeData(data);
}

export async function getSavedJobs(id, count = undefined, page = undefined) {
  const { data } = await API.get(ROUTES.APIsavedJobs, {
    params: {
      candidate: id,
      count,
      page
    }
  });
  return normalizeData(data.jobs);
}

export async function toggleHideJob(id, unhide) {
  const hidden = unhide ? false : true;
  const { data } = await API.patch(ROUTES.APIjobBase, {
    id,
    hidden
  });
  return normalizeData(data.result);
}

//* CATEGORIES
export async function getCategoryById(id) {
  const { data } = await API.get(ROUTES.APIcategories, {
    params: {
      id
    }
  });
  return normalizeData(data.category);
}

export async function getCategories(filterArr) {
  const filters = filterArr ? filterArr : [];
  const { data } = await API.post(ROUTES.APIcategories, {
    'filters': filters,
    'count': 100
  });
  return normalizeData(data.categories);
}

//* USERS
export async function registerUser(userObject) {
  try {
    const url = userObject.role === 'coordinator' ? ROUTES.APIregisterCoordinator : ROUTES.APIregister
    const { data } = await API.post(url, userObject);
    return normalizeData(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
//* UPLOAD RESUME/AVATAR
export async function uploadFile(folderType, file) {
  console.log(`Uploading ${folderType}...`);
  try {
    const formData = new FormData();
    formData.append('type', folderType);
    formData.append('file', file);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    const data = await API.post(ROUTES.APIupload, formData, config);
    return normalizeData(data.data.file);
  } catch (err) {
    console.log('Resume Upload Error: ', err);
    return err;
  }
}

//* STATS
export async function getLandingPageStats() {
  try {
    const { data } = await API.get(ROUTES.APIlandingPageStats);
    return normalizeData(data);
  } catch (err) {
    console.log(err);
    return err;
  }
}

//* UTILITIES
function formatCandidateFilters(filtersArr) {
  // Remove any falsey values from filtersArr
  const truthyFilters = filtersArr.filter(filter => {
    return !!filter.value;
  });

  // Format filters
  const formattedFilters = truthyFilters.map(filter => {
    switch (filter.key) {
      case 'experience': {
        return filter
      }
      case 'open to relocation': {
        const choiceBoolean = filter.value === 'No' ? false : true;
        return {
          key: 'willRelocate',
          value: choiceBoolean
        }
      }
      case 'authorized to work in the us': {
        const choiceBoolean = filter.value === 'No' ? false : true;
        return {
          key: 'workAuthorized',
          value: choiceBoolean
        }
      }
      case 'actively looking': {
        const choiceBoolean = filter.value === 'No' ? false : true;
        return {
          key: 'activelyLooking',
          value: choiceBoolean
        }
      }
      case 'category': {
        const categories = JSON.parse(localStorage.getItem('categories'));
        const categoryId = categories.find(category => category.name === filter.value).id;
        return {
          key: 'categoryId',
          value: categoryId
        }
      }
      case 'degree': {
        return {
          key: 'educationDegree',
          value: filter.value
        }
      }
      case 'Remote Availability': {
        return {
          key: 'employeeType',
          value: {
            hasSome: filter.value
          }
        }
      }
      case 'firstname': {
        return {
          key: 'firstName',
          value: filter.value
        }
      }
      case 'employment type': {
        return {
          key: 'employmentPreference',
          value: 
            filter.value
          
        }
      }
      default:
        return filter;
    }
  });

  // Add status filter before sending request if not already present
  if (!formattedFilters.some(filter => filter.key === 'status')) {
    formattedFilters.push({
      key: 'status',
      value: ACTIVE_STATUSES
    });
  }
  return formattedFilters;
}

export const sendJobsToCandidates = async ({ candidateIds, jobIds }) => {
  const response = await API.post(ROUTES.APIsendJobsToCandidates, { candidateIds, jobIds });
  if (response.result === false) {
    throw new Error(response.error);
  }
  return response.data;
}

export const sendCandidatesToCompanies = async ({ candidateIds, companyIds }) => {
  const response = await API.post(ROUTES.APIsendCandidatesToCompanies, { candidateIds, companyIds });
  if (response.result === false) {
    throw new Error(response.error);
  }
  return response.data;
}

export async function getCompanyQuickStats(duration) {
  const { data } = await API.get(ROUTES.companyQuickStats, {
    params: {
      duration
    }
  });
  return data.data;
}

export async function getCoordinatorQuickStats(duration) {
  const { data } = await API.get(ROUTES.coordinatorQuickStats, {
      duration
    }
  });
  return data.data;
}

function filtersArrToObj(filtersArr) {
  const filtersObj = {};
  filtersArr.forEach(filter => {
    filtersObj[filter.key] = filter.value;
  });
  return filtersObj;
