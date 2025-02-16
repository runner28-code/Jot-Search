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
// Temp comment
    <button 
      className={buttonStyles}
      type='submit'>
      {buttonString}
    </button>
  )
