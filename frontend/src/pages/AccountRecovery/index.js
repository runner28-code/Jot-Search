import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
import FormInput from '../../components/FormInput';

import API from '../../services/API';

export default function AccountRecovery() {
  const [response, setResponse] = useState('');
  const [condition, setCondition] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email } = event.target;
// Temp comment
    const res = await API.post(ROUTES.APIaccountRecovery, {
      email: email.value
    });

    if ( res.data.result ) {
      setType('Please check your email for instructions', true);
    } else {
      setType(res.data.error, false);
    }
  };
  function setType(response, condition) {
    setCondition(condition);
    setResponse(response);
