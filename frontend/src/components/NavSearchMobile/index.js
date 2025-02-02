import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingSpinner from '../LoadingSpinner';
import CandidateResults from './CandidateResults';
import CompanyResults from './CompanyResults';
import JobResults from './JobResults';
import { VscClose as CloseIcon } from 'react-icons/vsc';
import searchGray from '../../assets/images/search-gray.svg';
import searchWhite from '../../assets/images/search-white.webp';

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

export default function NavSearchMobile({ placeholder }) {
  const location = useLocation(); // Used to detect page change to clear state
  const [ searchTerm, setSearchTerm ] = useState('');
  const [forceHidden, setForceHidden] = useState(false);
  const userType = AuthService.getUserRole();

// Temp comment
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
    containerStyles: 'flex flex-row-reverse items-center justify-evenly bg-white border-solid border-2 border-lightGrey rounded-lg mr-4 ',
    searchIconStyles: 'h-16 px-2 bg-gray-200 text-neutral-400 text-[3.5rem] flex justify-center items-center rounded-lg',
    inputStyles: 'flex-1 h-24 rounded-l-lg pl-4'
  }

  return (
    <div>
      <div ref={menuRef} >
        <NavSearchBar
          searchTerm={ searchTerm }
          setSearchTerm={ handleSearchChange }
          placeholder={ placeholder }
          alternateStylesObject={ stylesObject } 
          setIsOpen={ setIsOpen }
          isOpen={ isOpen }
        />
      </div>
      { renderResultsContainer( combinedResults, searchTerm ) }
    </div>
  )
