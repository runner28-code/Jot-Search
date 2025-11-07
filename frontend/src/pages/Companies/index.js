import { useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../components/PageHeader';
import PageHeaderCandidate from '../../components/PageHeaderCandidate';
import AdvancedSearch from '../../features/AdvancedSearch';
import AdvancedSearchPublic from '../../features/AdvancedSearchPublic';
import AdvancedSearchCandidate from '../../features/AdvancedSearchCandidate';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import { MdSearch as SearchIcon } from 'react-icons/md';
import { BsBuilding as CompanyIcon } from 'react-icons/bs';
import Dashboard from '../../components/DashboardPublic';
import DashboardCandidate from '../../components/DashboardCandidate';
import useWindowDimensions from '../../hooks/windowDimensions';

import AuthService from '../../services/auth';

export default function Companies() {
  const { width } = useWindowDimensions();
  let userType = AuthService.getUserRole();
  const loggedIn = AuthService.loggedIn();
  const [toggle, setToggle] = useState(false);
  const sectionStylesLog = 'vw-990:ml-10 vw-990:mr-10 vw-640:ml-20 vw-640:mr-20 vw-1280:ml-0';
  const sectionStyles = '';

  function togglePassState() {
    setToggle(toggle => !toggle);
  }

  return (
    <section className={ loggedIn ? sectionStylesLog : sectionStyles }>
      <RenderHeader
        loggedIn={loggedIn}
        userType={userType}
        togglePassState={togglePassState}
        toggle={toggle}
      />
      <div 
        className={ !loggedIn && width <= 990 ? 'px-[5%]' 
          : !loggedIn ? 'px-[15%]' 
            : ''
        }>
        <RenderAdvancedSearch
          loggedIn={loggedIn}
          toggle={toggle}
          userType={userType}
        />
      </div>
    </section>
  )
}

function RenderHeader({loggedIn, userType, togglePassState, toggle}) {
  const { width } = useWindowDimensions();
  if( width <= 990 && userType === 'candidate' ) {
    return (<>
      <PageHeaderCandidate
        headerText={userType === 'coordinator' ? 'Careers List' : 'Search Results'}
        IconComponent={userType === 'coordinator' ? CareerIcon : CompanyIcon}
        backButton={true}
      />
      <DashboardCandidate 
        togglePassState={togglePassState} 
        toggle={toggle} 
      />
    </>)
  }  
  if( loggedIn ) {
    return (<>
      <PageHeader
        headerText={userType === 'coordinator' ? 'Careers List' : 'Search Results'}
// Temp comment
        IconComponent={userType === 'coordinator' ? CareerIcon : SearchIcon}
        backButton={true}
      />
    </>)
  }
  return (<>
    <Dashboard togglePassState={togglePassState} />
  </>)
