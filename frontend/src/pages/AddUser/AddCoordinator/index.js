import { useState, useEffect } from 'react';
import { renderButtonOrLoading } from '../../../components/RegistrationForm/utils';
import { registerUser } from '../../../services/API';
import { validateInput } from '../utils';

export default function AddCoordinator() {
  const [formObject, setFormObject] = useState(defaultState);
  const [submissionObject, setSubmissionObject] = useState({
    loading: false,
    success: false,
    errors: {},
  });

  // Submit form data when submissionObject.loading is set to true
  useEffect(async () => {
    if (submissionObject.loading) {
      const formObjectCopy = { ...formObject };
      delete formObjectCopy.verifyPassword;
      const data = await registerUser(formObjectCopy);
      if (data.result === true) {
        setSubmissionObject({
          loading: false,
          success: true,
          errors: {},
        });
      } else {
        const error = { submit: data.error }
        setSubmissionObject({
          loading: false,
          success: false,
          errors: error,
        });
      }
    }
  }, [submissionObject.loading]);

  // Clear form and success icon after 2 seconds
  useEffect(() => {
    if (submissionObject.success) {
      setTimeout(() => {
        setFormObject(defaultState);
        setSubmissionObject({
          loading: false,
          success: false,
          errors: {},
        });
      }, 2000);
    }
  }, [submissionObject.success]);

  function handleInputChange(e) {
    const { name, value } = e.target;

    // Error checking
    const newErrors = validateInput(
      name,
      value,
      submissionObject.errors,
      formObject.password
    );

    // Add errors to state if there are any
    if (Object.keys(newErrors).length > 0) {
      setSubmissionObject({
        ...submissionObject,
        errors: newErrors,
      });
    }
    // Update form object with new value
    setFormObject({ ...formObject, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Check errors and set state appropriately
    const errors = validateObject(formObject);
    if (Object.keys(errors).length > 0) {
      setSubmissionObject({ ...submissionObject, errors: errors });
      return;
    } else {
      setSubmissionObject({ ...submissionObject, loading: true });
    }
  }

  const inputStyles = 'h-20 pl-4 text-sm bg-neutral-100 font-roboto border-solid border rounded-2xl border-neutral-400 ';
  let validInputStyles = inputStyles + 'border-lightGrey ';
  let invalidInputStyles = inputStyles + 'border-rose-500 ';
  const labelStyles = 'opacity-70 text-xs';
  const addInputStyles = ' w-full';
  const inputContainer = 'w-full vw-900:w-6/12 vw-900:pr-8 flex flex-col mb-12';
  const buttonStyles = 'w-100 text-md bg-royalBlue font-semibold text-white rounded-2xl px-6 py-8 font-spaceGrotesk';
  const buttonString = 'Create Coordinator';
  return (
    <form
      className='flex flex-row flex-wrap items-center w-full vw-900:px-15 py-8 3vw-1280:ml-10'
      onSubmit={handleSubmit}
    >
      <div className={inputContainer}>
        {/* First Name */}
        <label className={labelStyles}>First Name</label>
        <input
          type='text'
          className={submissionObject.errors.firstname ? invalidInputStyles : validInputStyles += addInputStyles}
          name='firstname'
          placeholder='First Name'
          value={formObject.firstname}
          onChange={handleInputChange}
        />
        <p className='text-red-500 text-xs vw-768:text-sm font-spaceGrotesk'>{submissionObject.errors.firstname}</p>
      </div>
      <div className={inputContainer}>
        {/* Last Name */}
        <label className={labelStyles}>Last Name</label>
        <input
          type='text'
          className={submissionObject.errors.lastname ? invalidInputStyles : validInputStyles += addInputStyles}
          name='lastname'
          placeholder='Last Name'
          value={formObject.lastname}
          onChange={handleInputChange}
        />
        <p className='text-red-500 text-xs vw-768:text-sm font-spaceGrotesk'>{submissionObject.errors.lastname}</p>
      </div>
      <div className={inputContainer}>
        {/* Email */}
        <label className={labelStyles}>Email</label>
        <input
          type='text'
          className={submissionObject.errors.email ? invalidInputStyles : validInputStyles}
          name='email'
          placeholder='Email'
          value={formObject.email}
          onChange={handleInputChange}
        />
        <p className='text-red-500 text-xs vw-768:text-sm font-spaceGrotesk'>{submissionObject.errors.email}</p>
      </div>
      <div className={inputContainer + ' hidden vw-900:flex'}></div>
      <div className={inputContainer}>
        {/* Password */}
        <label className={labelStyles}>Password</label>
        <input
          type='password'
          className={submissionObject.errors.password ? invalidInputStyles : validInputStyles}
          name='password'
          placeholder='Password'
          value={formObject.password}
          onChange={handleInputChange}
        />
        <p className='text-red-500 text-xs vw-768:text-sm font-spaceGrotesk'>{submissionObject.errors.password}</p>
      </div>
      <div className={inputContainer}>
        {/* Verify Password */}
        <label className={labelStyles}>Verify Password</label>
        <input
          type='password'
// Temp comment
          className={submissionObject.errors.verifyPassword ? invalidInputStyles : validInputStyles}
          name='verifyPassword'
          placeholder='Verify Password'
          value={formObject.verifyPassword}
          onChange={handleInputChange}
        />
        <p className='text-red-500 text-xs vw-768:text-sm font-spaceGrotesk'>{submissionObject.errors.verifyPassword}</p>
      </div>
      {/* Add Button / Loading Spinner */}
      <p className='text-red-500 text-xs vw-768:text-sm font-spaceGrotesk mt-12 w-full'>{JSON.stringify(submissionObject.errors.submit)}</p>
      <div className='flex flex-col mx-auto vw-900:mx-0 vw-900:flex-row vw-900:mt-8'>
        {renderButtonOrLoading(submissionObject, buttonString, buttonStyles)}
      </div>
    </form>
  )
