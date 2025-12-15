import { Link } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';
import LoadingSpinner from '../../LoadingSpinner';
import { experienceMap } from '../../../utils/dbFieldMapping';
import * as ROUTES from '../../../routes';

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
      <div className='flex flex-col items-center justify-center w-full'>
        <p className='text-rose-500 text-sm font-bold'>{ errorBlock.error || errorBlock }</p>
      </div>
    )
  }
}

export function renderHeader(addType) {
  if ( addType === 'candidate' ) {
    return (
      <div className='flex flex-col justify-center'>
        <h4 className='text-h5 text-center vw-768:text-h4 text-darkGray font-spaceGrotesk font-semibold mb-10'>
          Create an Account
        </h4>
        <p className='text-sm text-center text-darkGray leading-loose'>
          {'Sign up and we\'ll keep you updated on new opportunities and put your profile in front of the people responsible for hiring at our companies.'}
        </p>
        <div className='mt-10 mb-20 flex justify-center'>
          <span className='text-sm text-darkGray leading-loose mx-4'>
            Already have an account?
          </span>
          <Link
            to={ROUTES.login}
            className='text-sm text-royalBlue leading-loose underline mx-4'
          >
            Log in here.
          </Link>
        </div>
        <hr className='mb-15' />
      </div>
    )
  }
}

export function inputValidation(formObj) {
  // Remove non-required properties

  let newErrors = [];

  // Check each property for falsy values
  const valuesToSkip = ['phone', 'willRelocate'];
  Object.entries(formObj).forEach(([key, value]) => {
    if ( !valuesToSkip.includes(key) ) {
      // If value is empty string or empty array, add to errors
      if (!value || (Array.isArray(value) && value.length === 0)) {
        newErrors.push(key);
      }
    }
  });

  if( formObj.state.length !== 2 ) {
    newErrors.push('state');
  }
  if( formObj.zip.length !== 5 || isNaN(formObj.zip) ) {
    newErrors.push('zip');
  }
  if ( formObj.linkedin.slice(0, 8) !== 'https://' ) { // Ensure valid URL
    newErrors.push('linkedin');
  }
  if ( !(formObj.resume instanceof File) ) { // Ensure resume is a file
    newErrors.push('resume');
  }
  if ( formObj.password !== formObj.verifyPassword ) { // Match passwords
    newErrors.push('password', 'verifyPassword');
  }
  if ( formObj.skills.length < 3 ) { // Ensure at least 3 skills chosen
    newErrors.push('skills');
  }

  // Only need LinkedIn OR resume, not both.
  // If one is missing but the other is present, remove either from errors array.
  if ( newErrors.includes('linkedin') && !newErrors.includes('resume') ) {
    newErrors = newErrors.filter(error => error !== 'linkedin');
  } else if ( newErrors.includes('resume') && !newErrors.includes('linkedin') ) {
    newErrors = newErrors.filter(error => error !== 'resume');
  }

  return newErrors;
}

export function formatFormObj(formObj, categoriesArray) {
  const newFormObj = { ...formObj };

  delete newFormObj.verifyPassword;

  newFormObj.firstname = newFormObj.firstName;
  newFormObj.lastname = newFormObj.lastName;
  delete newFormObj.firstName;
  delete newFormObj.lastName;
  delete newFormObj.terms;

  newFormObj.roles = newFormObj.roles.join(', ');

  newFormObj.skills = newFormObj.skills.join(', ');

  newFormObj.role = 'candidate';

  const categoryObjectFromName = categoriesArray.find(category => category.name === newFormObj.expertise);
  newFormObj.categoryId = categoryObjectFromName.id;
  delete newFormObj.expertise;

  for(let [key, value] of Object.entries(experienceMap)) {
    if ( newFormObj.experience === value ) {
      newFormObj.experience = experienceMap[key];
    }
  }

  if ( newFormObj.linkedin && !newFormObj.resume ) { delete newFormObj.resume; }
  if ( !newFormObj.linkedin && newFormObj.resume ) { delete newFormObj.linkedin; }

  return newFormObj;
}
