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
    disabled,
  } = props;

  function handleSelection(choice) {
    if ( type === MULTI_SELECT ) {
      if (currentChosen.includes(choice)) {
        onChange(name, currentChosen.filter(item => item !== choice));
// Temp comment
      } else {
        onChange(name, [...currentChosen, choice]);
      }
    } else { // single select
      onChange(name, choice);
    }
  }

  let containerStyles = 'relative ';
  containerStyles += stylesObject.marginBottom ? stylesObject.marginBottom : 'mb-16 ';
  let buttonStyles = buildButtonStyles(stylesObject, currentChosen, type);
  let listStyles = 'absolute top-full w-full max-h-140 overflow-y-auto ';
  listStyles += stylesObject.listStyles ? stylesObject.listStyles : 'bg-white font-bold px-10 py-8 z-10 shadow-resultCardShadow ';
  
  const closeMenuOnSelect = type === MULTI_SELECT ? false : true;
  return (
    <div>
      { renderLabel(name, label, required) }
      <Wrapper
        className={ `${containerStyles} ${disabled ? 'disabled cursor-not-allowed' : ''}`}
        onSelection={ handleSelection }
        closeOnSelection={ closeMenuOnSelect }
      >
        <Button
          className={ `${buttonStyles} ${disabled ? 'disabled cursor-not-allowed' : ''}` }
          disabled={disabled}>
          <span>{ buttonText(name, placeholder, currentChosen) }</span>
          { renderDropdownArrow(showDropdownArrow) }
        </Button>
        <Menu>
          <ul 
            name={ name }
            className={ listStyles }
          >
            { renderMenuItems(choices, choiceObject, currentChosen, name, stylesObject) }
          </ul>
        </Menu>
      </Wrapper>
    </div>
  );
