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
}

CandidateResults.propTypes = {
  candidates: PropTypes.arrayOf(PropTypes.object),
}

function CandidateResult({ candidate }) {
  const candidateName = candidate.firstName + ' ' + candidate.lastName;
  let occupationString = '';
  if ( !candidate.occupation && !candidate.companyName ) {
    occupationString = 'No Occupation Provided';
  } else {
    const occupation = candidate.occupation || 'N/A';
    const companyName = candidate.companyName || 'N/A';
    occupationString = `${occupation} at ${companyName}`;
  }
  const toLink = `${ROUTES.candidates}/${candidate.id}`;

  return (
    <Link
      to={toLink} 
      className='flex w-full my-1'
    >
      <CandidateIcon className='h-20 w-20 ml-2 mr-6 fill-black70%' />
      <div className='flex flex-col font-bold'>
        <p className='font-spaceGrotesk text-royalBlue text-md'>{ candidateName }</p>
        <p className='font-spaceGrotesk text-blue70% text-sm'>{ occupationString }</p>
      </div>
    </Link>
  )
}

CandidateResult.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    occupation: PropTypes.string,
    companyName: PropTypes.string,
  }).isRequired,
}