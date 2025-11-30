import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import listenForOutsideClicks from '../../hooks/outsideClickWrapper';
import ChoiceTag from '../ChoiceTag';
import ChoiceListItem from '../ChoiceListItem';

export default function TypeaheadDropdown(props) {
  const {
    type, 
    dropdownType, 
    disabled,
    name, 
    label,
    required,
    placeholder, 
    choices, 
    currentChosen, 
    onChange, 
    baseStyles, 
    inputHeight} = props;

  const [inputValue, setInputValue] = useState('');
  const [filteredChoices, setFilteredChoices] = useState(choices);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const menuRef = useRef(null);

  const handleChoiceClick = useCallback((choice) => {
    if (!currentChosen.includes(choice)) {
      onChange(name, [...currentChosen, choice]);
    } else {
      onChange(name, currentChosen.filter(item => item !== choice));
    }
  }, [onChange])

  /* Close dropdown on any outside clicks */
  useEffect(() => {
    listenForOutsideClicks(listening, setListening, menuRef, setDropdownOpen);
    if (!dropdownOpen) setInputValue('');
  }, [dropdownOpen]);
  
  /* Filter choices based on input */
  useEffect(() => {
    if (dropdownType === 'tags') {
      setFilteredChoices(choices.filter(choice => choice.toLowerCase().includes(inputValue.toLowerCase())));
    }
  }, [inputValue]);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleListClick() {
    setDropdownOpen(dropdownOpen => !dropdownOpen);
  }

  function handleKeyDown() {
    setDropdownOpen(true);
  }

  return (
    <div 
      className='relative w-full'
      ref={menuRef}  
    >
      { renderLabel(name, label, required) }
      <input 
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={inputValue}
        className={baseStyles + inputHeight + 'mb-0'}
        onClick={handleListClick}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      { renderDropdown(dropdownType, dropdownOpen, filteredChoices, currentChosen, handleChoiceClick) }
    </div>
  )
}

TypeaheadDropdown.propTypes = {
  type: PropTypes.string.isRequired,
  dropdownType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  currentChosen: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  baseStyles: PropTypes.string.isRequired,
  inputHeight: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

function renderLabel(name, label, required) {
  if ( !label ) {
    return null;
  }
  if( required ) {
    label += ' *';
  }
// Temp comment

  return (
    <label
      className='block text-textBlack mb-2.5'
      htmlFor={name}
    >
      {label}
    </label>
  )
}


function renderChosen(dropdownType, currentChosen, handleClick) {
  if ( dropdownType !== 'tags' ) { 
    return null; 
  }

  return (
    <div>
      {currentChosen.map(choice => {
        const isActive = currentChosen.includes(choice);
        const handleTagClick = () => {
          handleClick(choice);
        }

        return (
          <ChoiceTag 
            label={choice} 
            isActive={isActive} 
            handleClick={handleTagClick}
            key={choice} />
        )
      })}
    </div>
  )
}

function renderTagsOrListItems(dropdownType, choices, handleClick) {
  if ( dropdownType === 'tags' ) {
    return choices.map(choice => 
      <ChoiceTag 
        label={choice} 
        isActive={false} 
        handleClick={handleClick}
        key={choice} />
    )
  } else { // dropdownType === 'list'
    return choices.map((choice, index) => 
      <ChoiceListItem 
        job={choice}
        handleClick={handleClick}
        isLastItem={index === choices.length - 1}
        key={choice.id} />
    )
  }
