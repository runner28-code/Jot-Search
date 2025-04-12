import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaRegUserCircle as CandidateIcon } from 'react-icons/fa';
import AuthService from '../../services/auth';
import * as ROUTES from '../../routes';

export default function CandidateResults({ candidates }) {
  const role = AuthService.getUserRole();
  if (candidates.length === 0 || role === 'candidate') {
    return null;
  }

  return (
    <>
      { candidates.map(candidate => {
        return (
          <CandidateResult 
            candidate={candidate} 
            key={candidate.id} />
        )
      })}
      <hr className='w-full border-black50% mt-6 mb-2' />
    </>
  )
