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
  const sectionStyles = '';

  function togglePassState() {
    setToggle(toggle => !toggle);
