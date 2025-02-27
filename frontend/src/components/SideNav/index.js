import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  candidateChoices,
  companyChoices,
  coordinatorChoices,
  guestChoices,
  findSelectedFromPath
} from './utils';
import useWindowDimensions from '../../hooks/windowDimensions';
import * as ROUTES from '../../routes';

export default function SideNav({ userType }) {
  const { pathname } = useLocation();
  const hiddenPages = [ ROUTES.login, ROUTES.signup, ROUTES.landingPage, ROUTES.resetPassword, ROUTES.accountRecovery ];
  if ( hiddenPages.includes(pathname) ) {
    return null;
  }

  if( userType === 'guest' ) {
  }
  const { width } = useWindowDimensions();
  if ( width < 1280 ) {
    return null;
  }
  return (
    <aside className='w-125 min-w-125 h-full bg-white border-midGrey border border-solid rounded-2xl ml-10 mt-18 vw-1280:ml-20 vw-1280:mr-24'>
      { renderChoices(userType) }
    </aside>
  )
