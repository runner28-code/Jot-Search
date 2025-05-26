/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormInput from '../FormInput';
import ChoiceTag from '../ChoiceTag';
// import Dropdown from '../../components/UniversalDropdown';
import { referralChoices, communityChoices } from '../../utils/dbFieldMapping';
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
  phone: '',
  expertise: '',
  address1: '',
  city: '',
  state: '',
  zip: '',
  willRelocate: false,
  roles: [],
  skills: [],
  experience: '',
  employmentPreference: '',
  workspace: '',
  linkedin: '',
  referredBy: '',
  resume: {},
  password: '',
  verifyPassword: '',
  terms: false
};

const defaultCommunity = {
  community: ''
}
export default function RegistrationForm(loggedIn) {
  const {categories} = useContext(CategoryContext);
  const [formObj, setFormObj] = useState(defaultState);
  const [errors, setErrors] = useState([]);
  const [errorBlock, setErrorBlock] = useState('');
  const [referralChoice, setReferralChoice] = useState(false);
  const [commObj, setCommObj] = useState(defaultCommunity);
  const [relocate, setRelocate] = useState(false);
  const [submissionObject, setSubmissionObject] = useState({
    loading: false,
    success: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Who is adding the user; IF path is `/add-user`, then it's a coordinator adding a user
  const addType = location.pathname === '/add-user' ? 'coordinator' : 'candidate';

  useEffect(async () => { // Submit data
    // If loading object has been set to 'submitted', validate object and submit
    if ( submissionObject.loading ) {
      // Validation
      const newErrors = inputValidation(formObj);
      // Return and Re-render with errors if any are found
      if ( newErrors.length > 0 ) {
        setErrors(newErrors);
        setErrorBlock('Please fill out all required fields.');
        setSubmissionObject({
          loading: false,
          success: false,
        });
        return;
      }

      // Attempt to upload resume before submitting user data
      const resumeResponse = await uploadFile('resumes', formObj.resume);
      if ( resumeResponse.result === false ) {
        setErrors(['resume']);
        setErrorBlock('There was an error uploading your resume.');
        setSubmissionObject({
          loading: false,
          success: false,
        });
        return;
      }
      formObj.resume = resumeResponse;

      // Format formObj
      const formattedFormObj = formatFormObj(formObj, categories);

      // Submit to backend
      const { result } = await registerUser(formattedFormObj);
      if ( result === true ) {
        // Set success to true if on add-user page, navigate user to login if not
        if ( addType === 'coordinator' ) {
          return setSubmissionObject({
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
// Temp comment
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
      willRelocate: relocate,
      linkedin: linkedin.value,
      password: password.value,
      verifyPassword: verifyPassword.value,
    });
    setSubmissionObject({ // Setting loading to true triggers register API call in useEffect
      loading: true,
      success: false,
    });
    console.log(formObj);
