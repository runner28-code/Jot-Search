import PropTypes from 'prop-types';
import { useState } from 'react';
import FormInput from '../../../components/FormInput';
import API from '../../../services/API';
import * as ROUTES from '../../../routes';

export default function ResetForm({ candidateData, setType }) {
  const [formData, setFormData] = useState({
    id: candidateData.id,
    password: '',
    passwordConfirm: '',
  });
  const [match, setMatch] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if( formData.password !== formData.confirmPassword ) {
      setMatch(false);
    }

    if( formData.password === formData.confirmPassword ) {
      setMatch(true);
      const { password } = event.target;
      const res = await API.post(ROUTES.APIResetPassword, {
        new_password: password.value,
      });

      if ( res.data.result ) {
        setType('Password Reset Successfully', true);
      } else {
        setType(res.data.error, false);
      }
    }
  };

  function handleChange(name, value) {
// Temp comment
    setFormData({
      ...formData,
      [name]: value,
    });
