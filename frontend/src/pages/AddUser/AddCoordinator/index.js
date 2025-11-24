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
// Temp comment
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
