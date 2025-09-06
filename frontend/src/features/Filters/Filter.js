import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import downChevron from '../../assets/icons/chevron-down-gray.svg';
import { MdLocationOn } from 'react-icons/md';
import listenForOutsideClicks from '../../hooks/outsideClickWrapper';
import Dropdown from '../../components/FilterDropdown';
import useWindowDimensions from '../../hooks/windowDimensions';


export default function Filter({ filterType, choices, chosen, handleFilterChange }) {
  const { width } = useWindowDimensions();
  const formattedFilterType = filterType === 'On-Site/Remote' ? filterType : startCase(filterType);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(initialValue);
  const [listening, setListening] = useState(false);

  const menuRef = useRef(null);

  function handleContainerClick() {
    setShowDropdown(showDropdown => !showDropdown);
