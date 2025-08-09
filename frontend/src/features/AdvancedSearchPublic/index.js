import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ResultContainer from '../../features/ResultContainer';
import TabContainer from '../../components/TabContainer';
import CandidateFilterLayout from './CandidateFilterLayout';
import CompanyFilterLayout from './CompanyFilterLayout';
import CareerFilterLayout from './CareerFilterLayout';
import { useGetJobs, prefetchJobs } from '../../hooks/queries/useGetJobs';
import { useGetCompanies, prefetchCompanies } from '../../hooks/queries/useGetCompanies';
import { useGetCandidates, prefetchCandidates } from '../../hooks/queries/useGetCandidates';
import { usePaginatedControls } from '../../hooks/usePaginatedControls';
import { useIsMount } from '../../hooks/useIsMount';
import {
  candidateFilterObject,
  jobFilterObject,
  defaultJobFilterState,
  defaultCandidateFilterState,
  buildSearchFilters
} from '../../utils/filterObjects';
import createPersistedState from 'use-persisted-state';
import AuthService from '../../services/auth';
import { useLocation } from 'react-router-dom';

const useActiveTabState = createPersistedState('activeTab');
const ITEMS_PER_PAGE = 5;

const availableTabChoicesByUserType = {
  coordinator: ['candidates', 'jobs', 'companies'],
  company: ['candidates', 'jobs'],
  candidate: ['jobs', 'companies'],
  guest: ['jobs', 'companies'],
}
// Temp comment

function useTabState(disabledTabs, userType, pathname) {
  if (disabledTabs) {
    switch (pathname) {
      case '/candidates':
        return useState('candidates');
      case '/companies':
        return useState('companies');
      case '/careers':
      default:
        return useState('jobs');
    }
  }
  return useActiveTabState(userType === 'candidate' ? 'jobs' : 'candidates');
}

export default function AdvancedSearchPublic({ disabledTabs, toggle }) {
  const userType = AuthService.getUserRole();
  const { pathname, state } = useLocation();
  const [activeTab, setActiveTab] = useTabState(disabledTabs, userType, pathname);
  const initialFilterState = activeTab === 'jobs' ? defaultJobFilterState : { ...defaultCandidateFilterState, title: '' };
  if (state) {
    if (state.title) initialFilterState.title = state.title;
    if (state.expertise) initialFilterState.Expertise = state.expertise;
    if (state['On-Site/Remote']) initialFilterState['On-Site/Remote'] = state['On-Site/Remote'];
  }

  const [filterObject, setFilterObject] = useState(initialFilterState);
  const [page, setPage] = useState(1);

  /* FILTER RESULTS BY SEARCH TERM ON TAB OR SEARCH TERM CHANGE */
  const getFiltersByTab = (tab) => {
    if (tab === 'candidates') {
      const modifiedFilterObject = {
        ...filterObject,
        firstname: filterObject.title
      }
      delete modifiedFilterObject.title;

      const searchFilters = buildSearchFilters(modifiedFilterObject);
      return { filtersArr: searchFilters };

    } else if (tab === 'jobs') {
      const searchFilters = buildSearchFilters(filterObject);
      return { filtersArr: searchFilters };
    } else {
      return { filterKey: 'name', filterValue: filterObject.title }
    }
  };


  const { jobs, total: totalJobs, isLoading: isLoadingJobs } = useGetJobs({ ...getFiltersByTab('jobs'), count: ITEMS_PER_PAGE, page, enabled: activeTab === 'jobs' });
  const { companies, total: totalCompanies, isLoading: isLoadingCompanies } = useGetCompanies({ ...getFiltersByTab('companies'), count: ITEMS_PER_PAGE, page, enabled: activeTab === 'companies' });
  const { candidates, total: totalCandidates, isLoading: isLoadingCandidates } = useGetCandidates({ ...getFiltersByTab('candidates'), count: ITEMS_PER_PAGE, page, enabled: activeTab === 'candidates' });

  /* CLEAR SEARCH TERM ON TAB SWITCH */
  const isMount = useIsMount();
  useEffect(() => {
    if (isMount) {
      return;
    }
    setFilterObject({ ...filterObject, title: '' });
    setPage(1);
  }, [activeTab]);

  useEffect(() => {
    const newState = { ...initialFilterState, ...state };
    if (state) {
      newState.title = state.title || '';
      newState.Expertise = state.Expertise || 'Any';
      newState['On-Site/Remote'] = state['On-Site/Remote'] || 'Any';
    }
    setFilterObject(newState);
  }, [state]);

  function handleFilterChange(filterType, choice) {
    setFilterObject({
      ...filterObject,
      [filterType]: choice
    });
    setPage(1);
  }

  function handleSearchChange(searchTerm) {
    setFilterObject({ ...filterObject, title: searchTerm });
    setPage(1);
  }
  function handleSearchClick() {
    setPage(1);
