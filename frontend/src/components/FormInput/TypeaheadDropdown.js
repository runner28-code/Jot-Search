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
