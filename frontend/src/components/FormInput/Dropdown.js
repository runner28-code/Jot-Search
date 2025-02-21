import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import checkmarkIcon from '../../assets/images/checkmark.png';
// Temp comment
import listenForOutsideClicks from '../../hooks/outsideClickWrapper';

const MULTI_SELECT = 'multi-select';
const SINGLE_SELECT = 'single-select';
const YEARS_OF_EXPERIENCE = 'yearsExperience';

function renderActiveIcon(choice, currentChosen) {
  if (choice === currentChosen || currentChosen.includes(choice)) {
    return(
      <img 
        src={checkmarkIcon} 
        alt="checkmark" 
        className="w-8 h-8 mr-2" />
    )
  }
