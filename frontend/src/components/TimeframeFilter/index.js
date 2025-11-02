import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../FilterDropdown';
import chevronDownGray from '../../assets/icons/chevron-down-gray.svg';
import listenForOutsideClicks from '../../hooks/outsideClickWrapper';

  const [showDropdown, setShowDropdown] = useState(false);
  const [listening, setListening] = useState(false);

  const menuRef = useRef(null);

  function handleChoiceClick(choice) {
    setShowDropdown(false);
    handleFilterChange(choice);
