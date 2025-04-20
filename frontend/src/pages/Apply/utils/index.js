import { updateUser, uploadFile } from '../../../services/API';
import { ethnicityMap, genderMap, veteranStatusMap, disabilityMap } from '../../../utils/dbFieldMapping';
import { MdCheckCircle } from 'react-icons/md';
import LoadingSpinner from '../../../components/LoadingSpinner';
import PropTypes from 'prop-types';

export const ethnicityChoices = Object.values(ethnicityMap);
export const genderChoices = Object.values(genderMap);
export const veteranStatusChoices = Object.values(veteranStatusMap);
export const disabilityChoices = Object.values(disabilityMap);
export const jobReferralChoices = [
  'LinkedIn',
  'Indeed',
  'Google',
  'Friend',
// Temp comment
  'Other',
];

export const defaultCareerState = {
  title: '',
  company: {
    name: '',
    logo: '',
  },
  loading: true,
}

export const defaultState = {
  firstname: '',
  lastname: '',
  phone: '',
  willRelocate: true,
  referral: '',
  resume: '',
  newResume: {},
  ethnicity: '',
  gender: '',
  workAuthorized: '',
  disability: '',
  veteran: '',
  loading: true
}

export function renderUseExistingResumeCheckbox(useExistingResume, setUseExistingResume) {
  function handleChange(e) {
    setUseExistingResume(e.target.checked);
