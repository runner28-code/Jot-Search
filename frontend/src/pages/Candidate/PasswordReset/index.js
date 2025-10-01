import { useState } from 'react';
import PropTypes from 'prop-types';
import ResetButton from './ResetButton';
import ResetForm from './ResetForm';

  if ( role === 'company' || candidateData.sourceTable !== 'User' ) {
    return null;
  }
  const [response, setResponse] = useState('');
  const [condition, setCondition] = useState('');

  function setType(response, condition) {
    setCondition(condition);
    setResponse(response);
