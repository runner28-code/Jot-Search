import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ResultContainer from '../../features/ResultContainer';
import ResultsHeader from '../../components/ResultsHeader';
import TabContainer from '../../components/TabContainer';
import CandidateFilterLayout from './CandidateFilterLayout';
import CompanyFilterLayout from './CompanyFilterLayout';
import CareerFilterLayout from './CareerFilterLayout';
import { useGetJobs, prefetchJobs } from '../../hooks/queries/useGetJobs';
import { useGetCompanies, prefetchCompanies } from '../../hooks/queries/useGetCompanies';
import { useGetCandidates, prefetchCandidates } from '../../hooks/queries/useGetCandidates';
import { usePaginatedControls } from '../../hooks/usePaginatedControls';
import useWindowDimensions from '../../hooks/windowDimensions';
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

const availableTabChoicesByUserType = {
  coordinator: ['candidates', 'careers', 'companies'],
  company: ['careers', 'candidates' ],
  candidate: ['careers', 'companies'],
  guest: ['careers', 'companies'],
}

function useTabState(disabledTabs, userType, pathname) {
  if (disabledTabs) {
    switch (pathname) {
      case '/candidates':
        return useState('candidates');
      case '/companies':
        return useState('companies');
      case '/careers':
      default:
        return useState('careers');
    }
  }
  return useActiveTabState(userType === 'candidate' ? 'careers' : 'candidates');
}

export default function AdvancedSearch({ disabledTabs }) {
  const userType = AuthService.getUserRole();
  const { pathname, state } = useLocation();
  const [activeTab, setActiveTab] = useTabState(disabledTabs, userType, pathname);

  const initialFilterState = activeTab === 'careers' ? defaultJobFilterState : { ...defaultCandidateFilterState, title: '' };
  if (state && state.expertise) {
    initialFilterState.Expertise = state.expertise
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

    } else if (tab === 'careers') {
      const searchFilters = buildSearchFilters(filterObject);
      return { filtersArr: searchFilters };
    } else {
      return { filterKey: 'name', filterValue: filterObject.title }
    }
  };


  const { careers, total: totalJobs, isLoading: isLoadingJobs } = useGetJobs({ ...getFiltersByTab('careers'), count: ITEMS_PER_PAGE, page, enabled: activeTab === 'careers' });
  const { companies, total: totalCompanies, isLoading: isLoadingCompanies } = useGetCompanies({ ...getFiltersByTab('companies'), count: ITEMS_PER_PAGE, page, enabled: activeTab === 'companies' });
  const { candidates, total: totalCandidates, isLoading: isLoadingCandidates } = useGetCandidates({ ...getFiltersByTab('candidates'), count: ITEMS_PER_PAGE, page, enabled: activeTab === 'candidates' });

  /* CLEAR SEARCH TERM ON TAB SWITCH */
  useEffect(() => {
    setFilterObject({ ...filterObject, title: '' });
    setPage(1);
  }, [activeTab]);

  function handleFilterChange(filterType, choice) {
    setFilterObject({
      ...filterObject,
      [filterType]: choice
    });
    setPage(1);
