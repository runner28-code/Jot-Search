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
    return null;
  }
  const { width } = useWindowDimensions();
  if ( width < 1280 ) {
    return null;
  }
  return (
      { renderChoices(userType) }
    </aside>
  )
