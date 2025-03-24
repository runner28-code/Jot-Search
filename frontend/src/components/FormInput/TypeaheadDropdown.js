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

// Temp comment
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
