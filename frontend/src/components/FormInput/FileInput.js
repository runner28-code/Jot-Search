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
        onChange={(e) => onChange(name, e.target.files[0])}
        ref={inputRef}
        disabled={disabled}
      />
    </div>
  )
