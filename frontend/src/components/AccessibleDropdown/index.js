import PropTypes from 'prop-types';
import checkmarkIcon from '../../assets/images/checkmark.png';
import downChevron from '../../assets/icons/chevron-down-gray.svg';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import { experienceMap } from '../../utils/dbFieldMapping';

const MULTI_SELECT = 'multi-select';

export default function AccessibleDropdown(props) {
  const {
    type,
    name,
    label,
    placeholder,
    required,
    onChange,
    choices,
    choiceObject,
    currentChosen, 
    stylesObject,
    showDropdownArrow,
  } = props;

  function handleSelection(choice) {
    if ( type === MULTI_SELECT ) {
      if (currentChosen.includes(choice)) {
        onChange(name, currentChosen.filter(item => item !== choice));
      } else {
        onChange(name, [...currentChosen, choice]);
      }
    } else { // single select
      onChange(name, choice);
    }
