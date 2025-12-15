import { useRef } from 'react';
import PropTypes from 'prop-types';

export default function FileInput({type, name, label, placeholder, required, value, onChange, baseStyles, disabled}) {
  const inputRef = useRef(null);

  function handleKeyDown(e) {
    if ( e.key === ' ' || e.key === 'Enter' ) {
      e.preventDefault();
      inputRef.current.click();
    }
  }

  return (
    <div>
      { renderLabel( name, label, value, placeholder, required, handleKeyDown, baseStyles ) }
      <input 
        className={`hidden ${disabled ? 'disabled cursor-not-allowed' : ''}`}
        type={type}
        id={name}
        name={name}
        onChange={(e) => onChange(name, e.target.files[0])}
        ref={inputRef}
        disabled={disabled}
      />
    </div>
  )
}

FileInput.defaultProps = {
  name: '',
  value: {},
}

FileInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  baseStyles: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

function renderLabel( name, label, value, placeholder, required, handleKeyDown, baseStyles ) {
  if ( !label ) {
    return null;
  }

  if( required ) {
    label += ' *';
  }
  const inputString = value.name ? value.name : placeholder;
  return (
    <label 
      htmlFor={name} 
      tabIndex='0'
      onKeyDown={handleKeyDown}
    >
      <div className='block text-textBlack mb-2.5'>
        {label}
      </div>
      <div className={'flex items-center cursor-pointer ' + baseStyles}>
        {inputString}
      </div>
    </label>
  )
}