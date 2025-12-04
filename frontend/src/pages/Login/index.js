import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
import FormInput from '../../components/FormInput';

import API from '../../services/API';
import AuthService from '../../services/auth';

export default function Login() {
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    const res = await API.post(ROUTES.APIlogin, {
      email: email.value,
      password: password.value,
    });

    if ( res.data.result ) {
      AuthService.login(res.data.token);
    } else {
      setError(res.data.error);
    }
  };

  const renderError = () => {
    if ( error ) {
      return ( <div className='text-error mb-4'>{error}</div> )
    }
