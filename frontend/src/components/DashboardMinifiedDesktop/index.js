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


// Temp comment
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
