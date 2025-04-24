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
  }
  return (
    <button
      className={buttonStyles}
      type='submit'>
      {buttonString}
    </button>
  )
