import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingSpinner from '../LoadingSpinner';
import CandidateResults from './CandidateResults';
import CompanyResults from './CompanyResults';
import JobResults from './JobResults';
import searchWhite from '../../assets/images/search-white.webp';
import searchGray from '../../assets/images/search-gray.svg';

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
      </div>
      { renderResultsContainer( combinedResults, searchTerm ) }
    </div>
  )
}

NavSearch.propTypes = {
  placeholder: PropTypes.string
}

function renderResultsContainer( results, searchTerm ) {
  if ( !searchTerm || results.forceHidden ) { // if no searchTerm, no results to display
    return null;
  }

  return (
    <div className='absolute z-20 top-full w-full flex flex-col justify-center items-center min-h-50 px-6 py-4 rounded-2xl rounded shadow-resultCardShadow bg-white '>
      { renderResults( results ) }
    </div>
  )
}

function renderResults( results ) {
  if ( results.loading ) {
    return <LoadingSpinner
      height='75'
      width='75'
    />;
  }

  const { jobs, companies, candidates } = results;
  if ( !jobs?.length && !companies?.length && !candidates?.length ) {
    return (
      <div className='text-center text-h6 text-black70% font-bold font-spaceGrotesk'>
        No results found
      </div>
    );
  }

  return (<>
    {candidates && <CandidateResults candidates={ candidates } /> }
    <CompanyResults companies={ companies } />
    <JobResults jobs={ jobs } />
  </>)
}

const defaultStylesObject = {
  containerStyles: 'flex items-center justify-evenly p-4 h-24 vw-480:w-160 vw-1024:h-36 vw-1024:w-210 bg-white border-solid border-2 border-lightGrey rounded-2xl ',
  searchIconStyles: 'h-16 w-16 vw-1024:h-24 vw-1024:w-24 vw-480:ml-6 mr-10 bg-royalBlue flex justify-center items-center',
  inputStyles: 'flex-1 h-8 bg-lightGrey vw-480:placeholder:text-md vw-1024:placeholder:text-xl px-5'
}


function NavSearchBar({ searchTerm, setSearchTerm, placeholder, marginBottom, alternateStylesObject, isOpen, setIsOpen}) {
  const styleObject = { ...defaultStylesObject, ...alternateStylesObject };
  const offObject = {
    containerStyles: 'flex items-end ',
    searchIconStyles: 'fill-neutral-400',
    inputStyles: 'hidden '
  }
  function handleClick() {
    if( !searchTerm ) {
      setIsOpen(isOpen => !isOpen);
    }
  }

  if ( marginBottom ) {
    styleObject.containerStyles += `mb-${marginBottom} `;
  }

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  const placeholderText = placeholder || 'Search for companies or jobs...';
  return (
    <label
      className={ !isOpen ? offObject.containerStyles : styleObject.containerStyles }
      htmlFor={ placeholder }
    >
      <div
        className={ !isOpen ? offObject.searchIconStyles : styleObject.searchIconStyles }
        onClick={ handleClick }
      >
        <img
          src={ !isOpen ? searchGray : searchWhite }
          alt='search icon'
          className={ !isOpen ? 'w-12 mr-6' : 'w-6 mr-2'}
        />
        { !isOpen ? '' : 'Search'}
      </div>
      <input
        type='text'
        id={ placeholder }
        placeholder={ !isOpen ? '' : placeholderText  }
        value={ searchTerm }
        onChange={ handleChange }
        className={ !isOpen ? offObject.inputStyles : styleObject.inputStyles } />
    </label>
  )
