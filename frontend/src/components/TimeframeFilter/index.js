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
    setShowDropdown(false);
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
