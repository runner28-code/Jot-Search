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
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div>
      <div className='w-140'>
        <FormInput
          type='text'
          name='password'
          value={formData.password}
          onChange={handleChange}
          label='New Password'
        />
        <FormInput
          type='text'
          name='passwordConfirm'
          value={formData.passwordConfirm}
          onChange={handleChange}
          label='New Password Confirm'
        />
      </div>
      { renderMatch(match) }
      <button
        className='h-20 w-150 bg-royalBlue text-center text-white text-md px-12 rounded-lg'
        onClick={handleSubmit}
      >
        Reset Password
      </button>
    </div>
  )
