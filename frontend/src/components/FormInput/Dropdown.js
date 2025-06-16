import { useState, useRef, useEffect } from 'react';
import checkmarkIcon from '../../assets/images/checkmark.png';
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
}

function renderHorizontalRule(index, arrayLength) {
  if (index !== arrayLength - 1) {
    return (
      <hr className='border-royalBlue border-1.5 border-solid my-4' />
    )
  }
}

function renderChoices(choices, currentChosen, isOpen, handleClick) {

  const rootClass = 'absolute top-full w-full max-h-140 overflow-y-auto bg-white text-royalBlue px-12 py-12 z-10 shadow-resultCardShadow';

  if (!isOpen) {
    return null
  }
  
  return (
    <div className={ rootClass }>
      {choices.map((choice, index) => {
        return (<div key={choice + '-container'}>
          <div 
            onClick={() => handleClick(choice)}
            className='cursor-pointer flex items-center justify-between'
          >
            <span className='font-bold'>{choice}</span>
            {renderActiveIcon(choice, currentChosen)}
          </div>
          { renderHorizontalRule(index, choices.length) }
        </div>)
      })}
    </div>
  )
