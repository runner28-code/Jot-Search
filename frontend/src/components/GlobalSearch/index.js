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
// Temp comment
    setResults({ ...results, loading: true, forceHidden: false });
    debounceSearchTermFunction( searchTerm );
