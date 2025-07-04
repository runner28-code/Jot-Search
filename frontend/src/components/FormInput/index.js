import PropTypes from 'prop-types';
import TextInput from './TextInput';
import FileInput from './FileInput';
import AccessibleDropdown from '../AccessibleDropdown';
import TypeaheadDropdown from './TypeaheadDropdown';

const inputStyles = 'placeholder-textBlack text-md text-textBlack w-full py-2 pl-2 pr-10 vw-640:pl-6 mb-16 border border-solid rounded-xl ';
const inputHeight = 'h-18 vw-640:h-24 '; // Separated from other styles to easily read and manipulate for dropdowns
const regularBorder = 'border-midGrey ';
const errorBorder = 'border-rose-500 ';
const dropdownStyles = 'bg-lightGrey border border-midGrey border-solid rounded-b-lg overflow-y-auto z-10 ';
const dropdownItemStyles = 'text-textBlack text-md pl-8 py-7 hover:bg-royalBlue hover:text-white ';
export default function FormInput(props) {
  const {
    type,
    dropdownType,
    name,
    label,
    placeholder,
    value,
    required,
    onChange,
    choices,
    choiceObject,
    error,
    disabled
  } = props;

  let componentStyles = inputStyles;
  componentStyles += (error ? errorBorder : regularBorder);
  componentStyles += disabled ? 'bg-grey300 cursor-not-allowed ' : 'bg-lightGrey ';

  const stylesObject = {
    baseStyles: componentStyles,
    inputHeight: inputHeight,
    inputWidth: 'w-full',
    listStyles: dropdownStyles,
    listItemStyles: dropdownItemStyles
  };
  switch (type) {
    case 'file':
      return <FileInput
        type={type}
        name={name}
        label={label}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
        baseStyles={componentStyles + inputHeight}
        disabled={disabled}
      />
    case 'single-select': // fall through
    case 'multi-select':
      return <AccessibleDropdown
        name={name}
        label={label}
        placeholder={placeholder}
        currentChosen={value}
        required={required}
        onChange={onChange}
        choices={choices}
        choiceObject={choiceObject}
        stylesObject={stylesObject}
        showDropdownArrow={true}
        disabled={disabled}
      />
    case 'typeahead':
      return <TypeaheadDropdown
        type={type}
        dropdownType={dropdownType}
        name={name}
        label={label}
        placeholder={placeholder}
        currentChosen={value}
        required={required}
        onChange={onChange}
        choices={choices}
        baseStyles={componentStyles}
        inputHeight={inputHeight}
        disabled={disabled}
      />
    case 'password': // fall through to default
    default: // type == 'text' || 'password'
      return <TextInput
        type={type}
        name={name}
        label={label}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        baseStyles={componentStyles + inputHeight}
        disabled={disabled}
      />
  }
