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
  }

  function handleChange(name, value) {
    setFormObj({
      ...formObj,
      [name]: value,
    });
  }

  // Alter header and pronoun based on who is registering the new user
  const addType = location.pathname === '/add-user' ? 'coordinator' : 'candidate';
  const pronoun = addType === 'candidate' ? 'you' : 'they';
  const buttonString = addType === 'candidate' ? 'Join' : 'Add Candidate';

  // Conditional styles
  const userRegisterStyles = 'flex flex-col items-center w-3/4 vw-768:w-64% max-w-140 font-spaceGrotesk vw-768:py-16 vw-1024:py-24'
  const addCandidateStyles = 'flex flex-col items-center w-full font-spaceGrotesk'
  const containerStyles = addType === 'candidate' ? userRegisterStyles : addCandidateStyles;
  const midpointFlex = addType === 'candidate' ? '' : 'vw-900:flex justify-evenly';
  const flexWidth = addType === 'candidate' ? 'w-full' : 'vw-900:w-1/3';
  const buttonBaseStyles = 'h-20 bg-royalBlue text-center text-white my-4 ';
  const buttonStyles = buttonBaseStyles + (addType === 'candidate' ? 'w-full ' : 'w-100 ');

  return (
    <form 
      className={containerStyles} 
      onSubmit={handleSubmit}>
      { renderHeader(addType) }
      <div className={midpointFlex}>
        <div className={flexWidth}>
          <FormInput
            type='text'
            name='firstName'
            placeholder='First name' 
            error={errors.includes('firstName')}
          />
          <FormInput
            type='text'
            name='lastName'
            placeholder='Last name' 
            error={errors.includes('lastName')}
          />
          <FormInput
            type='text'
            name='email'
            placeholder='Email' 
            error={errors.includes('email')}
          />
          <FormInput
            type='single-select'
            name='expertise'
            placeholder='Expertise' 
            value={formObj.expertise}
            onChange={handleChange}
            choices={categories}
          />
          <FormInput
            type='multi-select'
            name='roles'
            placeholder={`What roles are ${pronoun} interested in?`}
            value={formObj.roles}
            onChange={handleChange}
            choices={formObj.expertise ? roleChoices[formObj.expertise] : []}
            error={errors.includes('roles')}
          />
          <FormInput
            type='typeahead'
            dropdownType='tags'
            name='skills'
            placeholder='Please select at least 3 skills' 
            value={formObj.skills}
            onChange={handleChange}
            choices={skillChoices}
            error={errors.includes('skills')}
          />
          <div className='flex flex-wrap mt-4 mb-16 w-full'>
            {formObj.skills.length > 0 ? formObj.skills.map(skill => 
              <ChoiceTag
                key={skill}
                label={skill}
                isActive={true}
                handleClick={() => handleChange('skills', formObj.skills.filter(s => s !== skill))}
              />
            ) : <p className='text-royalBlue text-md'>No skills selected</p>}
          </div>
        </div>
        <div className={flexWidth}>
          <FormInput
            type='single-select'
            name='experience'
            placeholder='Years of Experience' 
            value={formObj.experience}
            onChange={handleChange}
            choiceObject={experienceMap}
            error={errors.includes('experience')}
          />
          <FormInput
            type='single-select'
            name='employmentPreference'
            placeholder='Preferred Employment Type' 
            value={formObj.employmentPreference}
            onChange={handleChange}
            choices={['Any', 'Full-Time', 'Contract']}
            error={errors.includes('employmentPreference')}
          />
          <FormInput
            type='single-select'
            name='workspace'
            placeholder='Work Setting Preference (Remote, Office)' 
            value={formObj.workspace}
            onChange={handleChange}
            choices={['Any', 'Remote', 'On Site', 'Hybrid']}
            error={errors.includes('workspace')}
          />
          <FormInput
            type='text'
            name='linkedin'
            placeholder='LinkedIn URL' 
            error={errors.includes('linkedin')}
          />
          <FormInput
            type='text'
            name='referredBy'
            placeholder={`How did ${pronoun} hear about us?`} 
            value={formObj.referredBy}
            onChange={handleChange}
            error={errors.includes('referredBy')}
          />
          {/* File input for resume */}
          <FormInput
            type='file'
            name='resumeFile'
            placeholder='Upload Resume'
            value={formObj.resumeFile}
            onChange={handleChange}
            error={errors.includes('resumeFile')}
          />
          <FormInput
            type='password'
            name='password'
            placeholder='Password' 
            value={formObj.password}
            onChange={handleChange}
            error={errors.includes('password')}
          />
          <FormInput
            type='password'
            name='verifyPassword'
            placeholder='Verify Password' 
            value={formObj.verifyPassword}
            onChange={handleChange}
            error={errors.includes('verifyPassword')}
          />
        </div>
      </div>
      { renderErrorBlock(errorBlock) }
      { renderButtonOrLoading(submissionObject, buttonString, buttonStyles) }
    </form>
  )
