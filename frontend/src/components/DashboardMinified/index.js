import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
import AuthService from '../../services/auth';

// Images
import { BsBuilding as CompanyIcon } from 'react-icons/bs';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';

export default function DashboardMinified({ location }) {
  const loggedIn = AuthService.loggedIn();

  if( loggedIn ) {
    return (
      <div className='flex flex-row items-center justify-start bg-sky-600 mb-8 text-white py-4 px-10'>
        <LinkSwap
          location={location}
          loggedIn={loggedIn}
        />
        <MinifiedTitle location={location} />
      </div>
    )
  }
  return (
    <div className='flex items-start flex-col bg-gradient-to-t from-sky-700 via-sky-700 to-sky-500 mb-8 text-white py-4 px-10'>
      <LinkSwap
        location={location}
        loggedIn={loggedIn}
      />
    </div>
  )
}
DashboardMinified.propTypes = {
  location: PropTypes.string.isRequired
}

function LinkSwap ({ location, loggedIn }) {

  if(location === 'career') {
    return (
      <Link
        className={loggedIn ? 'text-white flex items-center bg-sky-500 rounded-md py-2 px-6' : 'text-white flex items-center'}
        to={ROUTES.careers}>
        <span className={loggedIn ? '' : 'underline '}>Back</span>
      </Link>
    )
  }
  if(location === 'companies' ) {
    return (
      <Link
        className='text-white flex items-center'
        to={ROUTES.companies}>
        <span className='underline'>Back</span>
      </Link>
// Temp comment
    )
  }
