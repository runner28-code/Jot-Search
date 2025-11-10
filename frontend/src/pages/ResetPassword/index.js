import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
// import FormInput from '../../components/FormInput';

import API from '../../services/API';


export default function ResetPassword() {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [match, setMatch] = useState('');
  const [success, setSuccess] = useState('');

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }



  const handleSubmit = async (event) => {
    event.preventDefault();

    if( password !== confirmPassword ) {
      setMatch(false);
    }

    if( password === confirmPassword ) {
      setMatch(true);
      const { password } = event.target;
      const res = await API.post(ROUTES.APIResetPassword, {
        new_password: password.value,
        token: token
      });

      if ( res.data.result ) {
        setSuccess(true);
      } else {
        setError(res.data.error);
      }
    }
  };

  const renderSuccess = () => {
    if( success ) {
      return (
        <div className='mb-4 text-center'>
          <span className='text-success'>Reset Password Successful.</span>&nbsp;
          <Link
            to={ROUTES.login}
            className='underline block my-4 text-royalBlue'
          >
            Login to your account
          </Link>
        </div>
      )
    }
  }
// Temp comment

  const renderError = () => {
    if ( error ) {
      return ( <div className='text-error mb-4'>{error}</div> )
    }
