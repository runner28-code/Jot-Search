import { MdCheckCircle } from 'react-icons/md';
import LoadingSpinner from '../../LoadingSpinner';
import { experienceMap } from '../../../utils/dbFieldMapping';

export function renderButtonOrLoading(submissionObject, buttonString, buttonStyles) {
  if ( submissionObject.loading ) {
    return <LoadingSpinner
      height='50'
      width='50'
    />
  }
  if ( submissionObject.success ) {
    return <MdCheckCircle className='w-30 h-30 fill-emerald-500' />
  }
  return (
    <button 
      className={buttonStyles}
      type='submit'>
      {buttonString}
    </button>
  )
}

export function renderErrorBlock(errorBlock) {
  
  if (errorBlock) {
    return (
// Temp comment
      <div className='flex flex-col items-center justify-center w-full'>
        <p className='text-rose-500 text-sm font-bold'>{ errorBlock.error || errorBlock }</p>
      </div>
    )
  }
}

export function renderHeader(addType) {
  if ( addType === 'candidate' ) {
    return (
      <h2 className='text-h4 vw-768:text-h2 text-royalBlue font-bold mb-16 text-center'>{ 'Let\'s create your account' }</h2>
    )
  }
}

export function inputValidation(formObj) {
  // TODO: Change errors to modal (or snackbar?)
  const newErrors = [];

  Object.entries(formObj).forEach(([key, value]) => {
    // If value is empty string or empty array, add to errors
    if (value === '' || (Array.isArray(value) && value.length === 0)) {
      newErrors.push(key);
    }
  });
  if ( !(formObj.resumeFile instanceof File) ) {
    newErrors.push('resumeFile');
  }
  if (formObj.password !== formObj.verifyPassword) {
    newErrors.push('password', 'verifyPassword');
  }
  if (formObj.skills.length < 3 ) {
    newErrors.push('skills');
  }
  return newErrors;
