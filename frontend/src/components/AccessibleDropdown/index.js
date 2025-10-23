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
}

AccessibleDropdown.defaultProps = {
  choices: [],
};

AccessibleDropdown.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  choices: PropTypes.array,
  choiceObject: PropTypes.object,
  currentChosen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  stylesObject: PropTypes.shape({
    baseStyles: PropTypes.string,
    inputHeight: PropTypes.string,
    inputWidth: PropTypes.string,
    marginBottom: PropTypes.string,
    listStyles: PropTypes.string,
    listItemStyles: PropTypes.string,
  }).isRequired,
  showDropdownArrow: PropTypes.bool,
  disabled: PropTypes.bool,
}

function buildButtonStyles(stylesObject) {
  let buttonStyles = 'mb-0 text-black70% flex justify-between items-center ';
  buttonStyles += stylesObject.baseStyles + stylesObject.inputHeight + stylesObject.inputWidth;

  return buttonStyles
}

function buttonText(name, placeholder, currentChosen) {
  if ( !placeholder ) {
    return currentChosen;
  }
  if ( name === 'experience' && currentChosen ) { // Grab value from experienceMap
    if ( isNaN(currentChosen) ) {
      return currentChosen + 'years';
    }
    const experience = isNaN(currentChosen) ? currentChosen : experienceMap[currentChosen];
    return experience ? experience + ' years' : placeholder;
  }

  let buttonString = placeholder;
  
  if (currentChosen) {
    if (Array.isArray(currentChosen) && currentChosen.length > 0) {
      buttonString = currentChosen.join(', ');
    } else if (typeof currentChosen === 'string') {
      buttonString = currentChosen;
    }
  } else { // no current chosen
    return buttonString
  }
  
  return buttonString;
}

function renderLabel(name, label, required) {
  if ( !label ) {
// Temp comment
    return null;
  }

  if ( required ) {
    label += ' *';
  }
  return (
    <label
      htmlFor={ name }
      className='block text-textBlack mb-2.5'
    >
      { label }
    </label>
  )
}

function renderDropdownArrow(dropdownArrow) {
  if ( !dropdownArrow ) {
    return null;
  }

  return (
    <img 
      src={ downChevron } 
      alt='down arrow' 
      className='h-5 w-7 ml-4' 
    />
  );
}

function renderMenuItems(choices, choiceObject, currentChosen, name, stylesObject) {
  if ( !choices ) {
    return <li className='flex items-center justify-center'>
      <p className='text-center text-textBlack my-4'>Error loading choices</p>
    </li>
  }
  
  if ( choices.length === 0 && name === 'roles' ) {
    return <li className='flex items-center justify-center'>
      <p className='text-center text-textBlack my-4'>Please select an expertise</p>
    </li>
  }

  if ( choices && !choiceObject ) {
    const objectifiedChoices = choices.reduce((acc, choice) => {
      if ( typeof choice === 'string' ) {
        acc[choice] = choice;
      } else {
        acc[choice.name] = choice.name;
      }
      return acc;
    }, {});
    choiceObject = objectifiedChoices;
  }
  
  const objectLength = Object.keys(choiceObject).length;
  let listItemStyles = 'cursor-pointer flex items-center justify-between ';
  if ( stylesObject.listItemStyles ) {
    listItemStyles += stylesObject.listItemStyles;
  }

  return Object.entries(choiceObject).map( ([key, value], index) => {
    if ( !value ) {
      return null;
    }

    if ( name === 'experience' ) {
      value += ' years';
    }

    return (
      <li key={key}>
        <MenuItem 
          className={ listItemStyles }
          value={key}
        >
          <span>{value}</span>
          {renderActiveIcon(key, currentChosen)}
        </MenuItem>
        { renderHorizontalRule(index, objectLength) }
      </li>
    );
  });
