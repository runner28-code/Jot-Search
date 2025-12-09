import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaRegUserCircle as CandidateIcon } from 'react-icons/fa';
import AuthService from '../../services/auth';
import * as ROUTES from '../../routes';

export default function CandidateResults({ candidates }) {
  if (candidates.length === 0 || role === 'candidate') {
    return null;
  }

  return (
    <>
      <h6 className='text-lg w-full text-black50% font-bold font-spaceGrotesk'>Candidates</h6>
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
