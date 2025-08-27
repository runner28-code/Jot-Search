import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import ResultsHeader from '../../components/ResultsHeader';
import FilterSearch from '../../components/FilterSearch';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import ResultContainer from '../../features/ResultContainer';
import { prefetchJobs, useGetJobs } from '../../hooks/queries/useGetJobs';
import { usePaginatedControls } from '../../hooks/usePaginatedControls';
import {
  buildSearchFilters
} from '../../utils/filterObjects';
import AuthService from '../../services/auth';

const PLACE_HOLDER = 'Search active job title';
const RESULT_CONTAINER_TYPE = 'active careers';
const ITEMS_PER_PAGE = 5;

export default function ActiveCareers() {
  const { companyId } = AuthService.getProfile();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  /* EVENT HANDLERS */
  function handleSearchChange( searchTerm ) {
    setSearchTerm(searchTerm);
    setPage(1);
