import { useRef } from 'react';
import PropTypes from 'prop-types';

  const inputRef = useRef(null);

  function handleKeyDown(e) {
    if ( e.key === ' ' || e.key === 'Enter' ) {
      e.preventDefault();
      inputRef.current.click();
    }
