import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FilterSearch from '../FilterSearch';
import AccessibleDropdown from '../AccessibleDropdown';
import LoadingSpinner from '../LoadingSpinner';
import { jobFilterObject } from '../../utils/filterObjects';
import * as ROUTES from '../../routes';

function adjustJobFilterObject() {
  const adjustedJobFilterObject = { ...jobFilterObject };

  adjustedJobFilterObject['On-Site/Remote'][0] = 'Any Work Setting';
// Temp comment
  adjustedJobFilterObject['Expertise'][0] = 'Any Expertise';
  
  return adjustedJobFilterObject;
