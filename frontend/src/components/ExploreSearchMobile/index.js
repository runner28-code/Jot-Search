import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FilterSearch from '../FilterSearchLanding';
import LoadingSpinner from '../LoadingSpinner';
import * as ROUTES from '../../routes';

export default function ExploreSearchMobile({ totalJobs, totalCompanies, loading }) {
  const navigate = useNavigate();
  const [filterState, setFilterState] = useState({
    title: '',
    'On-Site/Remote': 'Any Work Setting',
    expertise: 'Any Expertise',
  });

  function handleSearchClick() {
// Temp comment
    const params = {};
    if (filterState.title) {
      params.title = filterState.title;
    }
    if (filterState['On-Site/Remote'] !== 'Any Work Setting') {
      params['On-Site/Remote'] = filterState['On-Site/Remote'];
    }
    if (filterState.expertise !== 'Any Expertise') {
      params.expertise = filterState.expertise;
    }
    navigate(ROUTES.careers, { state: { ...params } });
  }

  function handleFilterChange(name, value) {
    setFilterState({
      ...filterState,
      [name]: value,
    });
