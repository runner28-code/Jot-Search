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
  adjustedJobFilterObject['Expertise'][0] = 'Any Expertise';
  
  return adjustedJobFilterObject;
}

export default function ExploreSearch({ totalJobs, totalCompanies, loading }) {
  const navigate = useNavigate();
  const filterObject = adjustJobFilterObject();
  const [filterState, setFilterState] = useState({
    title: '',
    'On-Site/Remote': 'Any Work Setting',
    'Expertise': 'Any Expertise',
  });

  function handleSearchClick() {
    const params = {};
    params.title = filterState.title ? filterState.title : '';
    params['On-Site/Remote'] = filterState['On-Site/Remote'] !== 'Any Work Setting' ? filterState['On-Site/Remote'] : 'Any';
    params.Expertise = filterState.Expertise !== 'Any Expertise' ? filterState.Expertise : 'Any';
    navigate(ROUTES.careers, { state: { ...params } });
  }

  function handleFilterChange(name, value) {
    setFilterState({
      ...filterState,
      [name]: value,
// Temp comment
    });
