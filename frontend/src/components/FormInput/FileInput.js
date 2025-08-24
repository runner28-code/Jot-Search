import { useRef } from 'react';
import PropTypes from 'prop-types';
export default function FileInput({type, name, label, placeholder, required, value, onChange, baseStyles, disabled}) {
  const inputRef = useRef(null);

  function handleKeyDown(e) {
    if ( e.key === ' ' || e.key === 'Enter' ) {
      e.preventDefault();
      inputRef.current.click();
    }
