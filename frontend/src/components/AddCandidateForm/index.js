import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormInput from '../FormInput';
import ChoiceTag from '../ChoiceTag';
import { 
  roles as roleChoices,
  skills as skillChoices,
} from '../../utils/skillHierarchyMap';
import {
  inputValidation,
  formatFormObj,
  renderButtonOrLoading,
  renderErrorBlock,
  renderHeader
} from './utils';
import * as ROUTES from '../../routes';
import { uploadFile, registerUser } from '../../services/API';
import { CategoryContext } from '../../services/CategoryContext';
import { experienceMap } from '../../utils/dbFieldMapping';

const defaultState = {
  expertise: '',
  roles: [],
  skills: [],
  experience: '',
  employmentPreference: '',
  workspace: '',
  linkedin: '',
  referredBy: '',
  resumeFile: {},
  password: '',
  verifyPassword: '',
};
export default function RegistrationForm() {
  const {categories} = useContext(CategoryContext);
  const [formObj, setFormObj] = useState(defaultState);
  const [errors, setErrors] = useState([]);
  const [errorBlock, setErrorBlock] = useState('');
  const [submissionObject, setSubmissionObject] = useState({
    loading: false,
    success: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(async () => { // Submit data
    // If loading object has been set to 'submitted', validate object and submit
    if ( submissionObject.loading ) {
      // Validation
      const newErrors = inputValidation(formObj);
      // Return and Re-render with errors if any are found
      if ( newErrors.length > 0 ) {
        setErrors(newErrors);
        setSubmissionObject({
          loading: false,
          success: false,
        });
        return; 
      }
      
      // Attempt to upload resume before submitting user data
      const resumeURL = await uploadFile('resumes', formObj.resumeFile);
      formObj.resume = resumeURL;
      delete formObj.resumeFile;
      
      // Format formObj
      const formattedFormObj = formatFormObj(formObj, categories);

      // Submit to backend
      const { result } = await registerUser(formattedFormObj);
      if ( result === true ) {
        // Set success to true if on add-candidate page, navigate user to login if not
        if ( location.pathname === '/add-candidate' ) {
            loading: false,
            success: true,
          })
        } else {
          return navigate(ROUTES.login);
        }
      } else {
        console.log('Error: ', result);
        setErrorBlock(result);
        setSubmissionObject({
          loading: false,
          success: false,
        });
      }
    }
  }, [submissionObject.loading]);

  useEffect(async () => { // Clear state after a couple seconds
    if ( submissionObject.success ) {
      setTimeout(() => {
        setFormObj(defaultState);
        setSubmissionObject({
          loading: false,
          success: false,
        });
      }, 2000);
    }
  }, [submissionObject.success])

  async function handleSubmit(event) {
    event.preventDefault();
    const { firstName, lastName, email, linkedin, password, verifyPassword } = event.target;
    setErrorBlock('');
    setErrors([]);
    setFormObj({
      ...formObj,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      linkedin: linkedin.value,
      password: password.value,
      verifyPassword: verifyPassword.value,
    });
    setSubmissionObject({ // Setting loading to true triggers register API call in useEffect
      loading: true,
      success: false,
    });
