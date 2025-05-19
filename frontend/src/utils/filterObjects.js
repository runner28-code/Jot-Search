const expertiseObjectArr = JSON.parse(localStorage.getItem('categories')) || [];
const expertises = expertiseObjectArr.map(expertise => expertise.name).sort();
import { experienceMap, educationChoices } from './dbFieldMapping';
import { skills } from './skillHierarchyMap';
const experienceValues = Object.values(experienceMap).filter(val => val !== null);

export const jobFilterObject = {
  'Expertise': [
    'Any',
    ...expertises
  ],
  'On-Site/Remote': [
    'Any',
    'On-Site',
    'Remote',
    'Hybrid',
    'Off-Site',
  ],
  'Years Experience': [
    'Any',
    ...experienceValues
  ],
  'Status': [
    'Any',
    'Filled',
    'Open',
    'Closed',
    'Passive',
    'Placed',
    'Hold',
    'Active',
    'Hired',
    'Advertising Only',
    'Waiting for inTake',
    'On-Deck',
  ]
};

export const ACTIVE_STATUSES = [
  'Active',
  'Open',
  'Passive'
]

// Create default filter state based on filterObject
const convertedJobFilters = {};
Object.keys(jobFilterObject).forEach(key => {
  convertedJobFilters[key] = jobFilterObject[key][0];
});

export const defaultJobFilterState = {
  title: '',
  status: ACTIVE_STATUSES,
  ...convertedJobFilters
};

/* CANDIDATE FILTER UTILS */
export const candidateFilterObject = {
  'Category': [
    'Any',
    ...expertises
  ],
  'Experience': [
    'Any',
    ...experienceValues
  ],
  'Open to Relocation': [
    'Any',
    'Yes',
    'No'
  ],
  'Remote Availability': [
    'Any',
    'Remote',
    'On Site',
    'Hybrid'
  ],
  'Employment Type': [
    'Any',
    'Full-Time',
    'Part-Time',
    'Contract',
    'Contract to Hire',
  ],
  'Authorized to work in the US': [
    'Any',
    'Yes',
    'No'
  ],
  'Actively Looking': [
    'Any',
    'Yes',
    'No'
  ],
  'Degree': [
    'Any',
    ...educationChoices
  ],
  'Status': [
    'Any',
    'Active',
    'New Lead',
    'Warm Lead',
    'Passive',
    'Hired',
  ],
  'Skills': [
    ...skills
  ],
};

// Create default filter state based on filterObject
const convertedCandidateFilters = {};
Object.keys(candidateFilterObject).forEach(key => {
  convertedCandidateFilters[key] = candidateFilterObject[key][0];
});

export const defaultCandidateFilterState = {
  firstname: '',
  ...convertedCandidateFilters
};

/* UTIL FUNCTIONS */
export function buildSearchFilters(filterObject) {
  const anyValues = ['Any', 'Any Expertise', 'Any Work Setting'];
  const searchFilters = [];
  Object.keys(filterObject).forEach(key => {
    if ( !anyValues.includes(filterObject[key]) ) {
      let filterKey = key.toLowerCase();
      if ( key === 'On-Site/Remote' ) {
        filterKey = 'onSite';
      } else if ( key === 'companyId' ) {
        filterKey = 'companyId';
      }
      searchFilters.push({
        key: filterKey,
        value: filterObject[key],
      });
    }
  });
  return searchFilters
