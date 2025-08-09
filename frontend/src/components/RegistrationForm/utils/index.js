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
