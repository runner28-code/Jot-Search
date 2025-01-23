import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import SearchBar from '../SearchBar';
import LoadingSpinner from '../LoadingSpinner';
import CandidateResults from './CandidateResults';
import CompanyResults from './CompanyResults';
import JobResults from './JobResults';

import { getCompanies, getJobs, getCandidates } from '../../services/API';
import listenForOutsideClicks from '../../hooks/outsideClickWrapper';

export default function GlobalSearch({ placeholder }) {
  const location = useLocation(); // Used to detect page change to clear state
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ results, setResults ] = useState({
    jobs: [],
    companies: [],
    candidates: [],
    loading: false,
    forceHidden: true
  });
  // State and ref to listen for outside clicks
  const [listening, setListening] = useState(false);
  const menuRef = useRef(null);

  /* EVENT HANDLERS */
  function handleSearchChange( searchTerm ) {
    setSearchTerm( searchTerm );
    setResults({ ...results, loading: true, forceHidden: false });
    debounceSearchTermFunction( searchTerm );
  }

  /* Debounce functions will wait until user stops typing to send API call */
  const debounceSearchTermFunction = useCallback(
    debounce( handleDebounce, 300 ),
    []
  );

  async function handleDebounce( searchTerm ) {
    if ( searchTerm === '' ) {
      return setResults({
        jobs: [],
        companies: [],
        candidates: []
      });
    }

    // TODO: API: Candidates if role === 'company' || 'coordinator'
    const [jobResults, companyResults, CandidateResults] = await Promise.all([
      getJobs( searchTerm, 'title', 3 ),
      getCompanies( searchTerm, 'name', 3 ),
      getCandidates( searchTerm, 'firstname', 3 )
    ]);

    const resultsObject = {
      jobs: jobResults && jobResults.length ? jobResults : [],
      companies: companyResults && companyResults.length ? companyResults.slice(0, 3) : [], //!!! TODO: Get rid of slice when Donnie has count filter working for companies
      candidates: CandidateResults && CandidateResults.length ? CandidateResults : [],
      loading: false,
    };

    setResults( resultsObject );
  }

  /* Clear state on page change */
  useEffect( () => {
    setSearchTerm('');
  }, [location]);
  /* Close dropdown on any outside clicks */
  const closeDropdown = () => {
    setResults({ ...results, forceHidden: true });
  };

  useEffect(() => {
    listenForOutsideClicks(listening, setListening, menuRef, closeDropdown);
  }, [closeDropdown]);
  
  /* STYLES & RENDER */
  const stylesObject = {
    containerStyles: 'flex flex-row-reverse items-center justify-evenly p-3 pl-6 h-18 w-135 vw-480:w-160 bg-white border-solid border-2 border-lightGrey rounded-2xl ',
    searchIconStyles: 'h-12 w-12 ml-6 bg-royalBlue rounded-full flex justify-center items-center',
    inputStyles: 'flex-1 h-5/6 vw-480:placeholder:text-md vw-1024:placeholder:text-xl'
  }

  return (
    <div className='relative'>
      <div ref={menuRef} >
        <SearchBar
          searchTerm={ searchTerm }
          setSearchTerm={ handleSearchChange }
          placeholder={ placeholder } 
          alternateStylesObject={ stylesObject } />
      </div>
      { renderResultsContainer( results, searchTerm ) }
    </div>
  )
