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
const ITEMS_PER_PAGE = 5;

const availableTabChoicesByUserType = {
  coordinator: ['candidates', 'careers', 'companies'],
  company: ['careers', 'candidates' ],
  candidate: ['careers', 'companies'],
  guest: ['careers', 'companies'],
}

function useTabState(disabledTabs, userType, pathname) {
  if (disabledTabs) {
    switch (pathname) {
        return useState('candidates');
      case '/companies':
        return useState('companies');
      case '/careers':
      default:
        return useState('careers');
    }
  }
  return useActiveTabState(userType === 'candidate' ? 'careers' : 'candidates');
