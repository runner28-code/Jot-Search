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
  const initialValue = chosen && chosen !== 'Any' ? chosen : formattedFilterType;
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(initialValue);
  const [listening, setListening] = useState(false);

  const menuRef = useRef(null);

  function handleContainerClick() {
    setShowDropdown(showDropdown => !showDropdown);
  }
  function handleChoiceClick(choice) {
    setShowDropdown(false);
    setSelected(choice);
    handleFilterChange(filterType, choice);
  }

  useEffect(() => {
    const value = chosen && chosen !== 'Any' ? chosen : formattedFilterType;
    setSelected(value);
  }, [chosen]);

  // Used to close dropdown when clicking outside of it
  useEffect(() => {
    listenForOutsideClicks(listening, setListening, menuRef, setShowDropdown);
  }, [showDropdown]);

  const dropdownBorder = showDropdown ? ' border-2 rounded-t-lg' : ' border-2 rounded-lg';
  const filterStyles = 'flex justify-between items-center pl-[18px] pr-s py-[9px] border-lightGrey bg-white cursor-pointer w-full ' + dropdownBorder;
  const containerStyles = 'relative grow flex-[1_1_30%]';
  const containerStylesMobile = 'relative grow flex-[1_1_100%] w-full';
  return (
    <div
      ref={menuRef}
      className={ width >= 990 ? containerStyles : containerStylesMobile}>
      <div
        id='title-wrapper'
        onClick={handleContainerClick}
        className={filterStyles}>
        {filterType === 'Location' && 
          <MdLocationOn
            className='w-10 h-10 mr-1' 
            color='lightGray'
          />}
        <p
          id='title'
          className='text-md text-black70%'>{ selected }</p>
        <img
          src={downChevron}
          alt='open'
          className='w-6 h-4'

      </div>
      { renderDropdown( showDropdown, choices, handleChoiceClick ) }
    </div>
  )
