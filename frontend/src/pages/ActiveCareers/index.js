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

// Temp comment
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
  }

  const filtersArr = buildSearchFilters({ title: searchTerm, companyId, status: ['Active', 'Open'] });

  const { jobs, total, isLoading }= useGetJobs({ filtersArr, count: ITEMS_PER_PAGE, page});

  const prefetchFunc = (page) => {
    prefetchJobs({ filtersArr, count: ITEMS_PER_PAGE, page })
  }

  const { PaginatedControls } = usePaginatedControls({ total, page, setPage, itemsPerPage: ITEMS_PER_PAGE, isLoading, prefetchFunc });

  return (
    <section>
      <PageHeader
        headerText='Active Careers'
        IconComponent={CareerIcon}
        classOverride='h-18 w-18'
        backButton
      />
      <FilterSearch
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        placeholder={PLACE_HOLDER}
        additionalClasses='w-180 mt-30'
      />
      <ResultsHeader
        total={total}
        loading={isLoading}
        type={RESULT_CONTAINER_TYPE}
      />
      <ResultContainer
        results={jobs}
        loading={isLoading}
        type={ RESULT_CONTAINER_TYPE }
        active={true}
      />
      <PaginatedControls />
    </section>
  )
