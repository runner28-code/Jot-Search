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
  }
  return (
    <label
      htmlFor='useExistingResume'
      className='mt-4 mb-5 flex items-center'
    >
      <input
        type='checkbox'
        name='useExistingResume'
        className='h-8 w-8 ml-2'
        checked={useExistingResume}
        onChange={handleChange}
      />
      <p className='text-md ml-2'>Use existing resume</p>
    </label>
// Temp comment
  )
}

export function Checkbox({ attribute, name, optionValue, setOptionValue, disabled }) {
  function handleChange(e) {
    setOptionValue(e.target.checked);
  }

  return (
    <label
      htmlFor={`${name}-${attribute}`}
      className='mt-4 mb-5 flex items-center text-black'
    >
      <input
        type='checkbox'
        name={`${name}-${attribute}`}
        id={`${name}-${attribute}`}
        className='h-8 w-8 ml-2'
        checked={optionValue === true || optionValue === attribute}
        onChange={handleChange}
        disabled={disabled}
      />
      <p className='text-md ml-2'>{attribute}</p>
    </label>
  )
}

Checkbox.propTypes = {
  attribute: PropTypes.string.isRequired,
  optionValue: PropTypes.bool,
  setOptionValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

export function renderButtonOrLoading(submissionObject, buttonString, buttonStyles) {
  if (submissionObject.loading) {
    return <LoadingSpinner
      height='50'
      width='50'
    />
  }
  if (submissionObject.success) {
    return <MdCheckCircle className='w-30 h-30 fill-emerald-500' />
  }
  return (
    <button
      className={buttonStyles}
      type='submit'>
      {buttonString}
    </button>
  )
