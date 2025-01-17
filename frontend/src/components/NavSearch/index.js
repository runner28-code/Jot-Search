import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingSpinner from '../LoadingSpinner';
import CandidateResults from './CandidateResults';
import CompanyResults from './CompanyResults';
import JobResults from './JobResults';
import searchWhite from '../../assets/images/search-white.webp';
import searchGray from '../../assets/images/search-gray.svg';

import listenForOutsideClicks from '../../hooks/outsideClickWrapper';
import { useGetJobs } from '../../hooks/queries/useGetJobs';
import { useGetCompanies } from '../../hooks/queries/useGetCompanies';
import { useGetCandidates } from '../../hooks/queries/useGetCandidates';
import AuthService from '../../services/auth';


import {
  defaultJobFilterState,
  buildSearchFilters,
  defaultCandidateFilterState
} from '../../utils/filterObjects';

const NUM_ITEMS_PER_TYPE = 5

export default function NavSearch({ placeholder }) {
  const location = useLocation(); // Used to detect page change to clear state
  const [ searchTerm, setSearchTerm ] = useState('');
  const [forceHidden, setForceHidden] = useState(false);
  const userType = AuthService.getUserRole();

  const getFiltersByTab = (tab) => {
    if (tab === 'candidates') {
      const splitName = searchTerm.split(' ')
      const modifiedFilterObject = {
        ...defaultCandidateFilterState,
        firstname: splitName[0],
        lastname: splitName?.[1]
      }
      delete modifiedFilterObject.title;

      const searchFilters = buildSearchFilters(modifiedFilterObject);
      return { filtersArr: searchFilters };
    }
    else if (tab === 'jobs') {
      const searchFilters = buildSearchFilters({...defaultJobFilterState, title: searchTerm});
      return { filtersArr: searchFilters };
    } else {
      return { filterKey: 'name', filterValue: searchTerm }
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const { jobs, total: totalJobs, isLoading: isLoadingJobs } = useGetJobs({ ...getFiltersByTab('jobs'), count: NUM_ITEMS_PER_TYPE, page: 1, enabled: isOpen });
  const { companies, total: totalCompanies, isLoading: isLoadingCompanies } = useGetCompanies({ ...getFiltersByTab('companies'), count: NUM_ITEMS_PER_TYPE, page: 1, enabled: isOpen });
  const { candidates, total: totalCandidates, isLoading: isLoadingCandidates } = useGetCandidates({ ...getFiltersByTab('candidates'), count: NUM_ITEMS_PER_TYPE, page: 1, enabled: isOpen && userType === 'coordinator' });
  // State and ref to listen for outside clicks
  const [listening, setListening] = useState(false);
  const menuRef = useRef(null);

  /* EVENT HANDLERS */
  function handleSearchChange( searchTerm ) {
    setSearchTerm( searchTerm );
    setForceHidden( false );
  }

  /* Clear state on page change */
  useEffect( () => {
    setSearchTerm('');
  }, [location]);

  /* Close dropdown on any outside clicks */
  const closeDropdown = () => {
    setForceHidden(true);
  };

  useEffect(() => {
    listenForOutsideClicks(listening, setListening, menuRef, closeDropdown);
  }, [closeDropdown]);

  const combinedResults = {
    jobs: jobs || [],
    companies: companies || [],
    candidates: candidates || [],
    loading: isLoadingJobs || isLoadingCompanies || (userType === 'coordinator' && isLoadingCandidates),
    total: totalJobs + totalCompanies + totalCandidates,
    forceHidden
  }

  /* STYLES & RENDER */
  const stylesObject = {
    containerStyles: 'flex flex-row-reverse items-center justify-evenly pl-6 bg-white border-solid border-2 border-lightGrey rounded-lg ',
    searchIconStyles: 'h-12 px-8 ml-6 bg-searchGreen text-white flex justify-center items-center rounded-r-lg rounded',
    inputStyles: 'flex-1 h-5/6 vw-1280:w-96 vw-480:placeholder:text-sm vw-1024:placeholder:text-base'
  }

  return (
    <div className='relative'>
      <div ref={menuRef} >
        <NavSearchBar
          searchTerm={ searchTerm }
          setSearchTerm={ handleSearchChange }
          placeholder={ placeholder }
          alternateStylesObject={ stylesObject } 
          setIsOpen={ setIsOpen }
          isOpen={ isOpen }
        />
      { renderResultsContainer( combinedResults, searchTerm ) }
    </div>
  )
