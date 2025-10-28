import PropTypes from 'prop-types';
import RegistrationFormInternal from '../../../components/RegistrationFormInternal';

export default function AddCandidate(loggedIn) {
  return (
    <div className='flex w-full vw-1280:px-0 3vw-1280:ml-10'>
      <RegistrationFormInternal loggedIn={loggedIn}/>
    </div>
// Temp comment
  )
