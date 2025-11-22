import { useState } from 'react';
import PropTypes from 'prop-types';
import ResetButton from './ResetButton';
import ResetForm from './ResetForm';

export default function PasswordReset({role, candidateData}) {
    return null;
  }
  const [response, setResponse] = useState('');
  const [condition, setCondition] = useState('');

  function setType(response, condition) {
    setCondition(condition);
    setResponse(response);
