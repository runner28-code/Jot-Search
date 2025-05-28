import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../FilterDropdown';
import chevronDownGray from '../../assets/icons/chevron-down-gray.svg';
import listenForOutsideClicks from '../../hooks/outsideClickWrapper';

export default function TimeframeFilter({ choices, timeframe, handleFilterChange }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [listening, setListening] = useState(false);

  const menuRef = useRef(null);

  function handleChoiceClick(choice) {
    handleFilterChange(choice);
  }

  function renderDropdown( showDropdown ) {
    if ( !showDropdown ) {
      return null
    }
  
    return (
      <Dropdown 
        choices={choices} 
        handleChoiceClick={handleChoiceClick} 
      />
    )
  }

  // Used to close dropdown when clicking outside of it
  useEffect(() => {
    listenForOutsideClicks(listening, setListening, menuRef, setShowDropdown);
  }, [showDropdown]);

  const dynamicStyles = showDropdown ? ' border rounded-t-lg ' : ' border rounded-lg ';
  const wrapperStyles = dynamicStyles + 'flex justify-between items-center pl-6 h-20 border-midGrey w-100 vw-400:w-114 cursor-pointer bg-white ';
  
  return (
    <div
      ref={menuRef}
      className='relative'>
      <div
        id='title-wrapper'
        onClick={() => setShowDropdown(showDropdown => !showDropdown)}
        className={ wrapperStyles }>
        <p
          id='title'
          className='Desktop-Body-textBody-paragraph-2 text-charcoal'>{ timeframe }</p>
        <img 
          className='w-6 mr-7'
          src={ chevronDownGray }
          alt='chevron down'  
        />
      </div>
      { renderDropdown( showDropdown ) }
    </div>
  )
