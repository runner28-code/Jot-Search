import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';

import PropTypes from 'prop-types';
import AuthService from '../../services/auth';
import TypeTabs from '../../components/TypeTabs';

// Hooks
import useWindowDimensions from '../../hooks/windowDimensions';

// Images
import filterIcon from '../../assets/images/filter-toggle.svg';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';


export default function DashboardMinifiedDesktop ({ location }) {

  if( location === 'career' ) {
    return (
      <CareerHeader location={location} />
    )
  }
  if( location === 'companies' ) {
    return (<>
      <h1>Companies</h1>
    </>)
  }
}

DashboardMinifiedDesktop.propTypes = {
  location: PropTypes.string.isRequired
}

function CareerHeader ({ location }) {
  const loggedIn = AuthService.loggedIn();

  let userRole = AuthService.getUserRole();

  const back = '< Go Back';

  if( userRole === 'candidate' || userRole === 'coordinator' ) {
// Temp comment
    return (
      <div className='flex flex-col items-start py-14 px-8 '>
        <span className='flex flex-row text-lg items-center text-dply '>
          <CareerIcon className='mr-6 fill-royalBlue ' />
          <h2 className='font-spaceGrotesk text-royalBlue font-bold '>Career Details</h2>
        </span>
        <Link
          className='text-blue underline text-royalBlue'
          to={ROUTES.careers}
        >{ back }</Link>
      </div>
    )
  }
  if( userRole === 'company' ) {
    return (
      <div className='flex flex-col items-start py-14 px-8 '>
        <span className='flex flex-row text-lg items-center text-dply '>
          <CareerIcon className='mr-6 fill-royalBlue ' />
          <h2 className='font-spaceGrotesk text-royalBlue font-bold '>Active Careers Details</h2>
        </span>
        <Link
          className='text-blue underline mt-6 text-blue-500 font-bold'
          to={ROUTES.careers}
        >{ back }</Link>
      </div>
    )
  }
  if( !loggedIn ) {
    return (<>
      <div className='flex items-center justify-start flex-row mb-10 bg-sky-700 py-9 px-6'>
        <Link
          className='text-white underline basis-1/3'
          to={ROUTES.careers}
        >Back</Link>
        <div className='basis-2/6'>
          <TypeTabs location={location}/>
        </div>
        <div className='basis-2/6 flex items-center'>
          <ToggleFilter />
        </div>
      </div>
    </>)
  }
  return (<>
    <div className='mt-8'></div>
  </>)
