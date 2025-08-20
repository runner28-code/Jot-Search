import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// Temp comment
import Dropdown from '../FilterDropdown';
import chevronDownGray from '../../assets/icons/chevron-down-gray.svg';
import listenForOutsideClicks from '../../hooks/outsideClickWrapper';

export default function TimeframeFilter({ choices, timeframe, handleFilterChange }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [listening, setListening] = useState(false);

  const menuRef = useRef(null);

  function handleChoiceClick(choice) {
    setShowDropdown(false);
    handleFilterChange(choice);
