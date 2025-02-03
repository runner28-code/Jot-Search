import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../../services/API';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import AuthService from '../../services/auth';
import urlDecode from '../../utils/urlDecode';
import { buildCareerAddress, calculatePostingAge, buildSalaryString } from '../../utils/formatFunctions';
import useWindowDimensions from '../../hooks/windowDimensions';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import Flag from '../../assets/icons/flag.svg';
import PageHeader from '../../components/PageHeader';
import DashboardPublicMin from '../../components/DashboardPublicMin';
import InviteCandidates from './InviteCandidates';

export default function CareerPage() {
  const { width } = useWindowDimensions();
  const location = useLocation();
  const activeData = location.state;

  const isMobile = width < 768;
  const role = AuthService.getUserRole();
  /* STATE */
  const { id } = useParams();
  const [careerData, setCareerData] = useState({});

  useEffect(async () => {
    const career = await getJobById(id);
    // Decode url encoded properties on career
    career.title = urlDecode(career.title);
    career.description = urlDecode(career.description);

  }, []);

  if ( !careerData.id ) { return <LoadingSpinner /> }

  const categoryString = careerData.category?.name.toUpperCase() || 'CATEGORY N/A';
  const addressString = buildCareerAddress(careerData.city, careerData.state);
  const salaryString = buildSalaryString(careerData.salary, careerData.salaryUnit);
  const postingAge = calculatePostingAge(careerData.createdAt);
  const data = {
    careerData,
    categoryString,
    addressString,
    salaryString,
    postingAge,
    role
  }
  const loggedIn = AuthService.loggedIn();

  const source = data.careerData.datasource;

  const containerStyles = 'ml-10 mr-10 vw-640:ml-20 vw-640:mr-20 vw-1280:ml-0';

  return (<>
    <RenderHeader
      loggedIn={loggedIn}
      role={role}
      source={source}
    />
    <div 
      className={ width <= 990 ? containerStyles
        : loggedIn ? containerStyles 
          : containerStyles + ' px-[15%]'}
    >
      { renderNotification(activeData, careerData) }
      {
        isMobile ?
          <MobileLayout data={data} /> :
          <DesktopLayout data={data} />
      }
      {
        role === 'coordinator' &&
        <InviteCandidates job={ careerData } />
      }
    </div>
  </>)
