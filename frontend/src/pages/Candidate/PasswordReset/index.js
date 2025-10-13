import { useState } from 'react';
import PropTypes from 'prop-types';
import ResetButton from './ResetButton';
import ResetForm from './ResetForm';

export default function PasswordReset({role, candidateData}) {
  if ( role === 'company' || candidateData.sourceTable !== 'User' ) {
    return null;
  }
  const [response, setResponse] = useState('');
  const [condition, setCondition] = useState('');

  function setType(response, condition) {
    setCondition(condition);
// Temp comment
    setResponse(response);
