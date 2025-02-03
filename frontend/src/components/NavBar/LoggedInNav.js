import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import inTulsaLogoText from '../../assets/images/intulsa-talent-careers.svg';
import chevronDownBlue from '../../assets/images/down-chevron-blue.svg';
import NavSearch from '../NavSearch';
import * as ROUTES from '../../routes';
import AuthService from '../../services/auth';
import useWindowDimensions from '../../hooks/windowDimensions';
import listenForOutsideClicks from '../../hooks/outsideClickWrapper';
import {
  candidateChoices,
  companyChoices,
  coordinatorChoices,
  findSelectedFromPath
} from '../SideNav/utils';
import { useCandidateContext } from '../../services/CandidateContext';

export default function NavBar() {
  const { width } = useWindowDimensions();

  if ( width < 1280 ) {
    return <NavBarLayout />
  } else {
    return <DesktopNavBarLayout />
  }
