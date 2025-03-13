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
  country: '',
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
export default function RegistrationFormInternal(loggedIn) {
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
  }

  function handleChange(name, value) {
    setFormObj({
      ...formObj,
      [name]: value,
    });
  }

  function handleReferralChoice(name, value) {
    if( value === 'Community Partner') {
      setReferralChoice(true);
    }
    if( value !== 'Community Partner' ) {
      setReferralChoice(false);
      setCommObj({
        ...commObj,
        community: ''
      });
    }
    handleChange(name, value);
  }

  function handleCommunityChoice(name, value) {
    setFormObj({
      ...formObj,
      referredBy: value
    })
    setReferralChoice(false);
  }


  // Alter header and pronoun based on who is registering the new user
  const pronoun = addType === 'candidate' ? 'you' : 'they';
  const buttonString = addType === 'candidate' ? 'Join' : 'Add Candidate';

  // Conditional styles
  const userRegisterStyles = 'flex flex-col items-center w-3/4 vw-768:w-70% max-w-208 font-spaceGrotesk vw-768:py-16 vw-1024:py-24'
  const addCandidateStyles = 'flex flex-col items-center w-full font-spaceGrotesk px-12'
  const containerStyles = addType === 'candidate' ? userRegisterStyles : addCandidateStyles;
  const midpointFlex = addType === 'candidate' ? 'w-full' : 'flex flex-col w-full';
  const buttonBaseStyles = 'text-md bg-royalBlue font-semibold text-white rounded-2xl px-6 py-8 font-spaceGrotesk ';
  const buttonStyles = buttonBaseStyles + (addType === 'candidate' ? 'w-full max-w-100 ' : 'w-100 ');
  const inputStyles = 'block w-full bg-lightGrey leading-8 text-sm vw-768:text-base border border-solid border-charcoal rounded-xl px-4 py-s mb-8 mt-2 cursor-pointer disabled:bg-midGrey disabled:cursor-not-allowed ';
  const hrStyles = 'mb-15 border-medGray border border-solid';
  const relocateClass = ' transform translate-x-5';
  const twocol = 'flex';
  const spacer = 'w-24';
  const titleStyles = 'text-xl font-spaceGrotesk font-semibold mb-8';

  return (
    <form
      className={containerStyles}
      onSubmit={handleSubmit}>
      { renderHeader(addType) }
      <div className={midpointFlex}>
        <h3 className={titleStyles}>Personal Info</h3>
        <div className={twocol}>
          <FormInput
            type='text'
            name='firstName'
            label='First Name'
            required={true}
            error={errors.includes('firstName')}
          />
          <div className={spacer}></div>
          <FormInput
            type='text'
            name='lastName'
            label='Last name'
            required={true}
            error={errors.includes('lastName')}
          />
        </div>
        <div className={twocol}>
          <FormInput
            type='text'
            name='email'
            label='Email'
            required={true}
            error={errors.includes('email')}
          />
          <div className={spacer}></div>
          <FormInput
            type='text'
            name='phone'
            label='Phone'
            value={formObj.phone}
            onChange={handleChange}
            error={errors.includes('phone')}
          />
        </div>
        <div className={twocol}>
          <FormInput
            type='text'
            name='address1'
            label='Address'
            required={true}
            value={formObj.address1}
            onChange={handleChange}
            error={errors.includes('address1')}
          />
          <div className={spacer}></div>
          <FormInput
            type='text'
            name='city'
            label='City'
            required={true}
            value={formObj.city}
            onChange={handleChange}
            error={errors.includes('city')}
          />
        </div>
        <div className={twocol}>
          <FormInput
            type='text'
            name='state'
            label='State (Abbreviated)'
            required={true}
            value={formObj.state}
            onChange={handleChange}
            error={errors.includes('state')}
          />
          <div className={spacer}></div>
          <FormInput
            type='text'
            name='zip'
            label='Zip / Postal Code'
            required={true}
            value={formObj.zip}
            onChange={handleChange}
            error={errors.includes('zip')}
          />
        </div>
        <FormInput
          type='text'
          name='country'
          label='Country'
          required={true}
          value={formObj.country}
          onChange={handleChange}
          error={errors.includes('country')}
        />
        <h3 className={titleStyles}>Career profile</h3>
        {/* Open to Relocation */}
        <div className='my-8'>
          <label className='block text-textBlack mb-2.5'>Open to Relocation? *
          </label>
          <div
            className="md:w-18 md:h-9 w-12 h-8 mt-4 flex items-center bg-lightGrey rounded-full p-1 cursor-pointer border border-solid border-midGrey"
            onClick={() => {
              setRelocate(!relocate);
            }}
          >
            {/* Switch */}
            <div
              className={
                'bg-royalBlue md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out' +
                (relocate ? relocateClass : null )
              }
            ></div>
          </div>
        </div>
        {/* Expertise */}
        <FormInput
          type='single-select'
          name='expertise'
          label='Expertise'
          required={true}
          placeholder='Select'
          value={formObj.expertise}
          onChange={handleChange}
          choices={categories}
          error={errors.includes('expertise')}
        />
        {/* Roles */}
        <FormInput
          type='multi-select'
          name='roles'
          label={`What roles are ${pronoun} interested in?`}
          required={true}
          placeholder='Select'
          value={formObj.roles}
          onChange={handleChange}
          choices={formObj.expertise ? roleChoices[formObj.expertise] : []}
          error={errors.includes('roles')}
        />
        {/* Work Setting Preference */}
        <FormInput
          type='single-select'
          name='workspace'
          label='Work Setting Preference (Remote, Office)'
          required={true}
          placeholder='Select'
          value={formObj.workspace}
          onChange={handleChange}
          choices={['Any', 'Remote', 'On Site', 'Hybrid']}
          error={errors.includes('workspace')}
        />
        {/* Experience */}
        <FormInput
          type='single-select'
          name='experience'
          label='Years of Experience'
          required={true}
          placeholder='Select'
          value={formObj.experience}
          onChange={handleChange}
          choiceObject={experienceMap}
          error={errors.includes('experience')}
        />
        {/* Employment Preference */}
        <FormInput
          type='single-select'
          name='employmentPreference'
          label='Preferred Employment Type'
          required={true}
          placeholder='Select'
          value={formObj.employmentPreference}
          onChange={handleChange}
          choices={['Any', 'Full-Time', 'Contract']}
          error={errors.includes('employmentPreference')}
        />
        <FormInput
          type='typeahead'
          dropdownType='tags'
          name='skills'
          label='Your skills (select at least 3)'
          placeholder='Select all that apply'
          required={true}
          value={formObj.skills}
          onChange={handleChange}
          choices={skillChoices}
          error={errors.includes('skills')}
        />
        <div className='bg-lightGrey flex flex-wrap pl-4 py-9 mt-8 mb-16 w-full'>
          {formObj.skills.length > 0 ? formObj.skills.map(skill =>
            <ChoiceTag
              key={skill}
              label={skill}
              isActive={true}
              handleClick={() => handleChange('skills', formObj.skills.filter(s => s !== skill))}
            />
          ) : <p className='text-midGrey text-md'>No skills selected</p>}
        </div>
        <FormInput
          type='text'
          name='linkedin'
          value={formObj.linkedin}
          onChange={handleChange}
          label='LinkedIn Profile link with https:// prefix'
          error={errors.includes('linkedin')}
        />
        {/* File input for resume */}
        <FormInput
          type='file'
          name='resume'
          label='Upload Resume (2mb max / Format: pdf,doc,docx,rtf)'
          placeholder='Select file...'
          value={formObj.resume}
          required={true}
          onChange={handleChange}
          error={errors.includes('resume')}
        />
        <h3 className={titleStyles}>Password</h3>
        <div className={twocol}>
          <FormInput
            type='password'
            name='password'
            label='Password'
            required={true}
            value={formObj.password}
            onChange={handleChange}
            error={errors.includes('password')}
          />
          <div className={spacer}></div>
          <FormInput
            type='password'
            name='verifyPassword'
            label='Verify Password'
            required={true}
            value={formObj.verifyPassword}
            onChange={handleChange}
            error={errors.includes('verifyPassword')}
          />
        </div>
        <hr className={hrStyles} />
// Temp comment
        <FormInput
          type='single-select'
          name='referredBy'
          label={`How did ${pronoun} hear about us?`}
          value={formObj.referredBy}
          onChange={handleReferralChoice}
          required={true}
          choices={referralChoices}
          error={errors.includes('referredBy')}
        />
        { renderCommunity(referralChoice, commObj, handleCommunityChoice, communityChoices) }
        {/* Terms and Conditions */}
        <div className={`flex items-center mb-6 ${errors.includes('terms') ? 'border-rose-500 border-solid border rounded-md p-2' : ''}`}>
          <input
            type='checkbox'
            name='terms'
            id='terms'
            value={formObj.terms}
            onChange={(e) => handleChange(e.target.name, e.target.checked)}
            className='mr-4 h-7 w-7'
          />
          <p>
            <span>I have read and accept the </span>
            <a
              href={ROUTES.termsOfService}
              target='_blank'
              rel='noopener noreferrer'
              className='text-royalBlue underline'
            >
              Terms and Conditions
            </a>
          </p>
        </div>
      </div>
      { renderErrorBlock(errorBlock) }
      { renderButtonOrLoading(submissionObject, buttonString, buttonStyles) }
    </form>
  )
