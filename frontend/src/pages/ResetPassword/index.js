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
